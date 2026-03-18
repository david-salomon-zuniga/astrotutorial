// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const articles = defineCollection({
    loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        published: z.coerce.date(),
        author: z.string(),
        // This tells Astro to resolve the path relative to the .md file
        image: image(),
        tech: z.array(z.string()),
        url: z.string()
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { articles };