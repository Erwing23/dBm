import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function POST(req: Request) {
  const data = await req.json();

  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.OWNTRACKS_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await supabase.from("locations").insert({
    lat: data.lat,
    lon: data.lon,
    tst: data.tst,
    payload: data,
  });

  return Response.json({ success: true });
}
