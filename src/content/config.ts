import { z, defineCollection } from "astro:content";

const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    // Home page fields
    hero: z
      .object({
        name: z.string(),
        title: z.string(),
        description: z.string(),
        tagline: z.string(),
        imageAlt: z.string(),
      })
      .optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    workTimeline: z
      .array(
        z.object({
          company: z.string(),
          url: z.string(),
        }),
      )
      .optional(),

    // About page fields
    experience: z
      .array(
        z.object({
          title: z.string(),
          company: z.string(),
          startDate: z.string(),
          endDate: z.string(),
          description: z.string().optional(),
          bullets: z.array(z.string()).optional(),
          ventures: z
            .array(
              z.object({
                name: z.string(),
                period: z.string(),
                bullets: z.array(z.string()),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
    education: z
      .array(
        z.object({
          degree: z.string(),
          school: z.string(),
          startDate: z.string(),
          endDate: z.string(),
          details: z.array(z.string()),
        }),
      )
      .optional(),
    hobbies: z
      .array(
        z.object({
          name: z.string(),
          period: z.string(),
          description: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
};
