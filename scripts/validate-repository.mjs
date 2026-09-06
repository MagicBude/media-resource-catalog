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
  "docs/providers/tmdb.md",
  "docs/providers/pansou.md",
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
  "packages/database/package.json",
  "packages/providers/package.json",
  "packages/catalog/package.json",
  "packages/catalog/src/media-catalog-service.ts",
  "packages/catalog/src/media-import-service.ts",
  "packages/core/src/media/types.ts",
  "packages/database/src/repositories/media-repository.ts",
  "packages/providers/src/metadata/tmdb/provider.ts",
  "apps/api/src/media-routes.ts",
  "apps/web/app/search/page.tsx",
];

const missing = requiredFiles.filter((file) => !existsSync(resolve(file)));

if (missing.length > 0) {
  console.error("Repository validation failed. Missing required files:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

const architectureText = readFileSync(
  resolve("docs/architecture/overview.md"),
  "utf8",
);
const agentsText = readFileSync(resolve("AGENTS.md"), "utf8");

const invariantPattern =
  /Media\s*[→↓]\s*Release\s*[→↓]\s*Share\s*[→↓]\s*Provenance/;

if (
  !invariantPattern.test(architectureText) ||
  !invariantPattern.test(agentsText)
) {
  console.error(
    "Repository validation failed. Core invariant Media / Release / Share / Provenance is missing.",
  );
  process.exit(1);
}

const providerText = readFileSync(
  resolve("docs/providers/provider-system.md"),
  "utf8",
);

for (const providerKind of ["Metadata Provider", "Resource Provider"]) {
  if (!providerText.includes(providerKind)) {
    console.error(
      `Repository validation failed. Missing provider boundary: ${providerKind}`,
    );
    process.exit(1);
  }
}

console.log(`✓ Required repository files: ${requiredFiles.length}`);
console.log("✓ Core invariant: Media → Release → Share → Provenance");
console.log("✓ Metadata / Resource Provider boundary is documented.");
console.log("✓ Repository handoff baseline is intact.");
