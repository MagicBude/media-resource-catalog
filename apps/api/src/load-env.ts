import { config } from "dotenv";
import { fileURLToPath } from "node:url";

const repositoryEnvPath = fileURLToPath(
  new URL("../../../.env", import.meta.url),
);

export function loadApiEnv() {
  config({
    path: repositoryEnvPath,
    override: false,
    quiet: true,
  });
}
