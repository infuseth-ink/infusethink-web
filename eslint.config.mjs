import { defineConfig, globalIgnores } from 'eslint/config';

// Root-level config. Each app owns its own full ESLint config.
// Linting of app code happens via `turbo lint` (CI) or each app's own config.
export default defineConfig([
  globalIgnores(['apps/**', 'packages/**', '.next/**', 'node_modules/**']),
]);
