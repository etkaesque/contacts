import { defineConfig } from "vitest/config";

import vue from "@vitejs/plugin-vue2";

export default defineConfig({
  plugins: [vue()],
  base: "https://etkaesque.github.io/contacts/",
  test: {
    globals: true,
    environment: "jsdom",
  },
  define: {
    SERVER_ADDR: JSON.stringify('https://contactspb.hop.sh'),
    STRUCTURES_PER_PAGE:8,


  }
});
