import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // Apply globally
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",       // Suppress unused imports
      "@typescript-eslint/no-explicit-any": "off",      // Suppress use of 'any'
      "@next/next/no-img-element": "off",               // Allow <img> tags
    },},
];

export default eslintConfig;
