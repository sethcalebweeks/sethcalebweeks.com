import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      image: z.string().optional(),
      description: z.string().optional(),
    }),
  });



export const collections = {
  'blog': blogCollection,
};