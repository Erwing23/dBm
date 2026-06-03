import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function GET() {
  return Response.json({ status: "ok" });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();

    console.log("OwnTracks payload:", body);

    const data = JSON.parse(body);

    const { error } = await supabase.from("locations").insert({
      lat: data.lat,
      lon: data.lon,
      tst: data.tst,
      payload: data,
    });

    if (error) {
      console.error(error);

      return Response.json({ error: error.message }, { status: 500 });
    }

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: String(error),
      },
      { status: 400 },
    );
  }
}
