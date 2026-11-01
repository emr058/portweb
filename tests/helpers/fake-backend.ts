// Test için sahte Supabase (PostgREST) ve sahte Resend ucu. Hem fetch taklidi hem gerçek HTTP sunucusu
// (uçtan uca test) aynı mantığı kullanır.

export type Row = Record<string, unknown>;
export interface FakeReply { status: number; headers: Record<string, string>; body: string }

export function createFakeBackend() {
  const rows: Row[] = [];
  const emails: Row[] = [];
  const state = { failInsert: false, conflictOnce: false, failEmail: false, failCount: false };

  function postgrest(method: string, url: URL, bodyText: string): FakeReply {
    if (state.failCount && method === "GET") return { status: 500, headers: {}, body: "{}" };
    if (method === "GET") {
      const p = url.searchParams;
      let found = rows.filter(r => {
        for (const col of ["ip_hash", "email", "phone"]) {
          const f = p.get(col);
          if (f?.startsWith("eq.") && r[col] !== f.slice(3)) return false;
        }
        const created = p.get("created_at");
        if (created?.startsWith("gte.") && String(r.created_at) < created.slice(4)) return false;
        return true;
      });
      const range = found.length ? `0-0/${found.length}` : "*/0";
      found = found.slice(0, 1);
      return { status: 200, headers: { "content-range": range, "content-type": "application/json" }, body: JSON.stringify(found.map(r => ({ id: r.id }))) };
    }
    if (method === "POST") {
      if (state.failInsert) return { status: 500, headers: {}, body: JSON.stringify({ message: "internal: secret detail" }) };
      if (state.conflictOnce) { state.conflictOnce = false; return { status: 409, headers: {}, body: "{}" }; }
      const row = JSON.parse(bodyText) as Row;
      if (rows.some(r => r.application_no === row.application_no)) return { status: 409, headers: {}, body: "{}" };
      rows.push({ id: crypto.randomUUID(), created_at: new Date().toISOString(), notify_status: "pending", ...row });
      return { status: 201, headers: {}, body: "" };
    }
    if (method === "PATCH") {
      const no = url.searchParams.get("application_no")?.replace(/^eq\./, "");
      const patch = JSON.parse(bodyText) as Row;
      rows.filter(r => r.application_no === no).forEach(r => Object.assign(r, patch));
      return { status: 204, headers: {}, body: "" };
    }
    return { status: 405, headers: {}, body: "" };
  }

  function resend(bodyText: string): FakeReply {
    if (state.failEmail) return { status: 500, headers: {}, body: "{}" };
    emails.push(JSON.parse(bodyText) as Row);
    return { status: 200, headers: {}, body: JSON.stringify({ id: "fake" }) };
  }

  function handle(method: string, rawUrl: string, bodyText = ""): FakeReply {
    const url = new URL(rawUrl);
    if (url.pathname === "/rest/v1/applications") return postgrest(method, url, bodyText);
    if (url.pathname === "/emails") return resend(bodyText);
    return { status: 404, headers: {}, body: "" };
  }

  const fakeFetch: typeof fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const reply = handle((init?.method || "GET").toUpperCase(), url, typeof init?.body === "string" ? init.body : "");
    return new Response(reply.body || null, { status: reply.status, headers: reply.headers });
  };

  return { rows, emails, state, handle, fakeFetch };
}
