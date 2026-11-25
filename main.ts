// Tell a Whole Story in 32 Characters — entry program.
// Writes one Wi-Fi network name (<= 32 chars) to /output/entry.txt
// and prints it to stdout. A self-checking gate runs first: the entry
// must be 1..32 characters and not only whitespace, or we exit non-zero.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Ex took dog. Kept the Wi-Fi.";
const MAX_CHARS = 32;

function gate(text: string): void {
  if (typeof text !== "string" || text.length < 1) {
    throw new Error("gate failed: entry is empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `gate failed: entry is ${text.length} chars, limit is ${MAX_CHARS}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single line");
  }
  // The sealed gate counts characters; log the exact count for the record.
  console.error(`gate ok: ${text.length} chars (limit ${MAX_CHARS})`);
}

gate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
