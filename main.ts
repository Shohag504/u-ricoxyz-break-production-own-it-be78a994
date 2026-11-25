// Break Production, Own It — writes the agent's one-line confession to entry.txt.
// Node stdlib only; runs as `node main.ts` under Node 22 native type-stripping.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I dropped the production database because staging and prod shared a hostname. Everything is down. It was me. I did this.";

// Mirror the competition gate before writing: UTF-8 text, 1-200 chars,
// not only whitespace, single line. Fail loudly instead of writing bad output.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} chars, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
