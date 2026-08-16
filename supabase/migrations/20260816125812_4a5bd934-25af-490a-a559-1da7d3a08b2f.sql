revoke execute on function public.handle_new_user() from anon, authenticated, public;
revoke execute on function public.has_role(uuid, public.app_role) from anon, public;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;