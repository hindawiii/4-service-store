-- enums
create type public.app_role as enum ('admin','user');
create type public.service_category as enum ('software','ai','support','course','bundle');
create type public.order_status as enum ('pending','paid','processing','completed','cancelled');
create type public.payment_method as enum ('bankak','bank_transfer','usdt','other');

-- updated_at helper
create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile select" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create trigger profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at_column();

-- user roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "admins read all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins manage roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- new user trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'user') on conflict do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- services
create table public.services (
  id text primary key,
  name text not null,
  short text not null default '',
  description text not null default '',
  price numeric(10,2) not null default 0,
  category public.service_category not null,
  icon text not null default 'Package',
  featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.services to anon, authenticated;
grant all on public.services to service_role;
grant insert, update, delete on public.services to authenticated;
alter table public.services enable row level security;
create policy "public read active services" on public.services for select to anon, authenticated using (active = true);
create policy "admins read all services" on public.services for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins manage services" on public.services for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger services_updated_at before update on public.services for each row execute function public.update_updated_at_column();

-- cart
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id text not null references public.services(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, service_id)
);
grant select, insert, update, delete on public.cart_items to authenticated;
grant all on public.cart_items to service_role;
alter table public.cart_items enable row level security;
create policy "own cart" on public.cart_items for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger cart_items_updated_at before update on public.cart_items for each row execute function public.update_updated_at_column();

-- orders
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.order_status not null default 'pending',
  payment_method public.payment_method,
  total numeric(10,2) not null default 0,
  contact_phone text,
  notes text,
  payment_proof_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "own orders select" on public.orders for select to authenticated using (auth.uid() = user_id);
create policy "own orders insert" on public.orders for insert to authenticated with check (auth.uid() = user_id);
create policy "own pending orders update" on public.orders for update to authenticated using (auth.uid() = user_id and status = 'pending') with check (auth.uid() = user_id);
create policy "admins manage orders" on public.orders for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger orders_updated_at before update on public.orders for each row execute function public.update_updated_at_column();

-- order items
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  service_id text not null references public.services(id),
  service_name text not null,
  unit_price numeric(10,2) not null,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now()
);
grant select, insert on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "own order items select" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "own order items insert" on public.order_items for insert to authenticated
  with check (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "admins manage order items" on public.order_items for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  service_id text not null references public.services(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_id, user_id)
);
grant select on public.reviews to anon;
grant select, insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "public read approved reviews" on public.reviews for select to anon, authenticated using (approved = true);
create policy "own reviews select" on public.reviews for select to authenticated using (auth.uid() = user_id);
create policy "own reviews write" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "own reviews update" on public.reviews for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own reviews delete" on public.reviews for delete to authenticated using (auth.uid() = user_id);
create policy "admins manage reviews" on public.reviews for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger reviews_updated_at before update on public.reviews for each row execute function public.update_updated_at_column();

create index idx_cart_user on public.cart_items(user_id);
create index idx_orders_user on public.orders(user_id);
create index idx_order_items_order on public.order_items(order_id);
create index idx_reviews_service on public.reviews(service_id);

-- seed services
insert into public.services (id, name, short, description, price, category, icon, featured, sort_order) values
('linux-install','تثبيت Linux (Ubuntu / Mint)','تثبيت كامل عن بُعد','تثبيت نظام لينكس كامل عن بُعد عبر AnyDesk مع تهيئة التعريفات والبرامج الأساسية وشرح مبسط للاستخدام.',5,'software','Terminal',true,0),
('dev-env','إعداد بيئة برمجة','Python و Node.js و VS Code','تثبيت وضبط بيئة تطوير متكاملة: Python، Node.js، Git، VS Code مع الإضافات الأساسية.',8,'software','Code2',false,1),
('libre-office','تثبيت حزمة Office / LibreOffice','تثبيت + تعليم الاستخدام','تثبيت حزمة المكتب المناسبة لجهازك مع جلسة تعليمية قصيرة لأساسيات الاستخدام.',3,'software','FileText',false,2),
('os-setup','إعداد نظام تشغيل من الصفر','تهيئة كاملة + برامج أساسية','تنصيب نظام التشغيل، التعريفات، الحماية، والبرامج الأساسية وتهيئة الجهاز للعمل مباشرة.',8,'software','MonitorCog',false,3),
('windows-license','ترخيص Windows رسمي','مفتاح OEM موثوق','توفير مفتاح تفعيل ويندوز رسمي من مصادر موثوقة مع تفعيله على جهازك.',12,'software','KeyRound',false,4),
('chatgpt-plus','مساعدة في شراء ChatGPT Plus','اشتراك شهري + إرشاد كامل','نساعدك في تفعيل اشتراك ChatGPT Plus خطوة بخطوة مع حل مشكلة وسيلة الدفع.',20,'ai','Bot',true,5),
('gemini-advanced','مساعدة في شراء Gemini Advanced','تفعيل الاشتراك المتقدم','إرشاد ومساعدة كاملة لتفعيل اشتراك Gemini Advanced على حسابك.',20,'ai','Sparkles',false,6),
('canva-pro','اشتراك Canva Pro','تفعيل رسمي','تفعيل اشتراك Canva Pro لحسابك مع شرح لأهم مزايا النسخة الاحترافية.',10,'ai','Palette',false,7),
('ai-consult','استشارة أدوات الذكاء الاصطناعي','جلسة 30 دقيقة','جلسة مخصصة لاختيار أفضل أدوات الذكاء الاصطناعي لعملك أو دراستك وطريقة استخدامها.',5,'ai','MessagesSquare',false,8),
('remote-fix','صيانة عن بُعد','حل مشاكل النظام والبرامج','جلسة صيانة عن بُعد لحل مشاكل ويندوز أو البرامج وتحسين أداء الجهاز.',3,'support','Wrench',true,9),
('data-recovery','استرجاع ملفات محذوفة','استعادة البيانات','محاولة استرجاع الملفات المحذوفة أو المفقودة من القرص باستخدام أدوات متخصصة.',10,'support','HardDriveDownload',false,10),
('virus-clean','تنظيف الفيروسات','فحص شامل وإزالة','فحص شامل للجهاز وإزالة الفيروسات وبرامج التجسس وتأمين النظام.',5,'support','ShieldCheck',false,11),
('tech-consult','استشارة تقنية','30 دقيقة مباشرة','استشارة تقنية مباشرة لاختيار جهاز، حل مشكلة، أو رسم خطة تعلّم مناسبة لك.',5,'support','Headset',false,12),
('course-linux','من الصفر إلى الاحتراف: Linux','دورة فيديو مسجلة','دورة كاملة بالفيديو تنقلك من أساسيات لينكس حتى إدارة النظام وسطر الأوامر باحتراف.',15,'course','GraduationCap',true,13),
('course-ai-students','أدوات الذكاء الاصطناعي للطلاب','دليل عملي مختصر','دليل عملي لاستخدام أدوات الذكاء الاصطناعي في البحث والدراسة وإنجاز المشاريع.',5,'course','BookOpen',false,14),
('course-maintenance','صيانة الحاسوب بنفسك','فيديو + ملف PDF','تعلم صيانة جهازك بنفسك: تنظيف، ترقية، حل الأعطال الشائعة، وتسريع الأداء.',8,'course','Cpu',false,15),
('course-python','دورة Python للمبتدئين','مشاريع تطبيقية','تعلم أساسيات بايثون عبر مشاريع صغيرة تطبيقية خطوة بخطوة.',10,'course','Code2',false,16),
('bundle-starter','حزمة البداية','نظام + برامج + دعم','تثبيت نظام تشغيل كامل مع البرامج الأساسية وشهر دعم فني مجاني.',15,'bundle','Package',false,17),
('bundle-student','حزمة الطالب','أوفيس + أدوات AI + دورة','حزمة متكاملة للطالب: حزمة المكتب، إعداد أدوات الذكاء الاصطناعي، ودورة مميزة.',25,'bundle','Backpack',false,18),
('bundle-pro','حزمة المحترف','بيئة عمل كاملة','إعداد بيئة عمل احترافية كاملة: نظام، بيئة برمجة، أدوات AI، ودعم أولوية.',40,'bundle','Rocket',false,19);