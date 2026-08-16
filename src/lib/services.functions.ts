import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import type { Service } from "@/data/services";

const SELECT = "id, name, short, description, price, category, icon, featured";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listServices = createServerFn({ method: "GET" }).handler(async (): Promise<Service[]> => {
  const { data, error } = await publicClient()
    .from("services")
    .select(SELECT)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((s) => ({ ...s, price: Number(s.price) })) as Service[];
});

export const getService = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data: input }): Promise<Service | null> => {
    const { data, error } = await publicClient()
      .from("services")
      .select(SELECT)
      .eq("id", input.id)
      .eq("active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? ({ ...data, price: Number(data.price) } as Service) : null;
  });

export const listServiceReviews = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data: input }) => {
    const { data, error } = await publicClient()
      .from("reviews")
      .select("id, rating, comment, created_at")
      .eq("service_id", input.id)
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw new Error(error.message);
    return data ?? [];
  });