import { z, defineCollection } from "astro:content";

const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    hero: z.object({
      name: z.string(),
      title: z.string(),
      description: z.string(),
      tagline: z.string(),
      imageAlt: z.string(),
    }),
    links: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
    workTimeline: z.array(
      z.object({
        company: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

export const collections = {
  pages: pagesCollection,
};
