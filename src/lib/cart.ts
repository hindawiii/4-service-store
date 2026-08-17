import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CartRow {
  id: string;
  quantity: number;
  service_id: string;
  services: { id: string; name: string; price: number; icon: string } | null;
}

export function useCart(enabled = true) {
  return useQuery({
    queryKey: ["cart"],
    enabled,
    queryFn: async (): Promise<CartRow[]> => {
      const { data, error } = await supabase
        .from("cart_items")
        .select("id, quantity, service_id, services(id, name, price, icon)")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((r) => ({
        ...r,
        services: r.services ? { ...r.services, price: Number(r.services.price) } : null,
      })) as CartRow[];
    },
  });
}

export function useCartMutations() {
  const qc = useQueryClient();
  const done = { onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }) };

  const add = useMutation({
    mutationFn: async (serviceId: string) => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) throw new Error("يجب تسجيل الدخول");
      const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("service_id", serviceId)
        .maybeSingle();
      if (existing) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1 })
          .eq("id", existing.id);
        if (error) throw error;
        return;
      }
      const { error } = await supabase
        .from("cart_items")
        .insert({ service_id: serviceId, user_id: uid, quantity: 1 });
      if (error) throw error;
    },
    ...done,
  });

  const setQty = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (quantity < 1) {
        const { error } = await supabase.from("cart_items").delete().eq("id", id);
        if (error) throw error;
        return;
      }
      const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id);
      if (error) throw error;
    },
    ...done,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cart_items").delete().eq("id", id);
      if (error) throw error;
    },
    ...done,
  });

  return { add, setQty, remove };
}