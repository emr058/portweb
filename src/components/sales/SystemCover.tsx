import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

export function SystemCover({ src, alt }: { src: string; alt: string }) {
  const exists = existsSync(path.join(process.cwd(), "public", src));
  return exists ? <Image className="system-cover-image" src={src} alt={alt} width={1200} height={750} sizes="(max-width: 900px) 100vw, 640px" /> : null;
}
