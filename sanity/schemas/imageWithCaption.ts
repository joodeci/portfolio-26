import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'imageWithCaption',
  title: 'Image with Caption',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A brief description shown under the image',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Descriptive text for accessibility and SEO',
    }),
  ],
});