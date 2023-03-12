import { ofetch } from "ofetch";

export default defineNuxtPlugin(() => {
  globalThis.$fetch = ofetch.create({
    headers: {
      Authorization: "Bearer Secret",
    },
  });
});
