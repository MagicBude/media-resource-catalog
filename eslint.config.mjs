import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const jsFiles = ["**/*.{js,mjs,cjs}"];
const tsFiles = ["**/*.{ts,tsx}"];

export default tseslint.config(
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/coverage/**"],
  },
  {
    ...eslint.configs.recommended,
    files: jsFiles,
    languageOptions: {
      ...eslint.configs.recommended.languageOptions,
      globals: {
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  {
    files: tsFiles,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { "prefer": "type-imports" }
      ]
    }
  }
);
