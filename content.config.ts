import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string().optional(),
      }),
    }),
  },
});
