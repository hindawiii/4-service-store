import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/public/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const staticPaths = ["/", "/services", "/about", "/contact", "/terms", "/privacy"];
        let servicePaths: string[] = [];

        try {
          const supabase = createClient(
            process.env["SUPABASE_URL"]!,
            process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!,
            { auth: { persistSession: false } },
          );
          const { data } = await supabase.from("services").select("id").eq("active", true);
          servicePaths = (data ?? []).map((s) => `/services/${s.id}`);
        } catch {
          servicePaths = [];
        }

        const urls = [...staticPaths, ...servicePaths]
          .map((p) => `  <url><loc>${origin}${p}</loc></url>`)
          .join("\n");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
          { headers: { "content-type": "application/xml; charset=utf-8" } },
        );
      },
    },
  },
});
