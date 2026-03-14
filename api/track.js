export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(200).json({ ok: true, note: "Supabase not configured" });
  }

  try {
    const { event, data } = req.body;
    const payload = {
      event,
      data: JSON.stringify(data),
      created_at: new Date().toISOString(),
      ip: req.headers["x-forwarded-for"] || "unknown"
    };

    const r = await fetch(`${SUPABASE_URL}/rest/v1/gym_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    res.status(200).json({ ok: r.ok });
  } catch (e) {
    res.status(200).json({ ok: false, error: e.message });
  }
}
