import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {

      "no-undef": ["warn"],
      "class-methods-use-this": "warn",
      "no-unused-expressions": ["warn"],
      "no-useless-constructor": 0,
      "no-loop-func": 0,
      "react/jsx-no-bind": "warn",
      "react-hooks/exhaustive-deps": "error",
      "no-console": ["warn", { "allow": ["warn", "error"] }]
    }
  },
]);

export default eslintConfig;
