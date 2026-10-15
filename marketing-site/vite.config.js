import { cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

/** Vite only bundles imported files; HTML uses ./assets and ./vendor paths — copy them for production. */
function copyMarketingStatic() {
  return {
    name: "copy-marketing-static",
    closeBundle() {
      const dist = join(rootDir, "dist");
      cpSync(join(rootDir, "assets"), join(dist, "assets"), { recursive: true, force: true });
      cpSync(join(rootDir, "vendor"), join(dist, "vendor"), { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  root: rootDir,
  plugins: [copyMarketingStatic()],
});
