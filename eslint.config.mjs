// eslint.config.mjs (Flat config)
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Next.js recommended rules (legacy converted)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Turn off rules that conflict with Prettier
  prettierConfig,

  // Run Prettier as an ESLint rule
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      // Show Prettier issues as errors so ESLint can fix them
      "prettier/prettier": "error",
    },
  },
];
