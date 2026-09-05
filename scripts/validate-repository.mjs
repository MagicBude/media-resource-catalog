import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "README.md",
  "AGENTS.md",
  "PROJECT_STATUS.md",
  "MANIFEST.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "docs/README.md",
  "docs/product/vision.md",
  "docs/product/scope.md",
  "docs/product/decisions.md",
  "docs/architecture/overview.md",
  "docs/architecture/module-boundaries.md",
  "docs/data-model/overview.md",
  "docs/data-model/media.md",
  "docs/data-model/tv.md",
  "docs/data-model/release.md",
  "docs/data-model/share-provenance.md",
  "docs/providers/provider-system.md",
  "docs/search/catalog-search.md",
  "docs/search/resource-discovery.md",
  "docs/ui/information-architecture.md",
  "docs/ui/page-specs.md",
  "docs/community/accounts-permissions.md",
  "docs/community/contribution-governance.md",
  "docs/api/public-api-v1.md",
  "docs/security/product-boundaries.md",
  "docs/development/local-development.md",
  "docs/development/commands.md",
  "docs/development/testing.md",
  "docs/development/database.md",
  "docs/roadmap/roadmap.md",
  "docs/handoff/current-state.md",
  "docs/handoff/next-session.md",
  "apps/web/package.json",
  "apps/api/package.json",
  "packages/core/package.json",
  "packages/database/package.json"
];

const missing = requiredFiles.filter((file) => !existsSync(resolve(file)));

if (missing.length > 0) {
  console.error("Repository validation failed. Missing required files:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

const architectureText = readFileSync(resolve("docs/architecture/overview.md"), "utf8");
const agentsText = readFileSync(resolve("AGENTS.md"), "utf8");

const invariant = "Media → Release → Share → Provenance";

if (!architectureText.includes(invariant) || !agentsText.includes(invariant)) {
  console.error(`Repository validation failed. Core invariant is missing: ${invariant}`);
  process.exit(1);
}

console.log(`✓ Required repository files: ${requiredFiles.length}`);
console.log(`✓ Core invariant: ${invariant}`);
console.log("✓ Repository handoff baseline is intact.");
