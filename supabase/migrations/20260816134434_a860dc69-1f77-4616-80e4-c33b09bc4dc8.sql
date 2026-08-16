create policy "own proofs insert" on storage.objects for insert to authenticated
with check (bucket_id = 'payment-proofs' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "own proofs select" on storage.objects for select to authenticated
using (bucket_id = 'payment-proofs' and ((storage.foldername(name))[1] = auth.uid()::text or public.has_role(auth.uid(), 'admin')));

create policy "own proofs delete" on storage.objects for delete to authenticated
using (bucket_id = 'payment-proofs' and (storage.foldername(name))[1] = auth.uid()::text);