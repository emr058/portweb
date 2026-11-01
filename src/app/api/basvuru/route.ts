import { after } from "next/server";
import { handleApplication } from "@/lib/applications/handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleApplication(request, task => after(task));
}
