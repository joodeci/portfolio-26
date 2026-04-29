import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    // ─── HEADER INFO (always shown at the top) ────────────
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL of this page, e.g. /case-study/my-project — generate from the title, no leading slash',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A 1–2 sentence summary shown on the work card and page subheader',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'E-Commerce', value: 'E-Commerce' },
          { title: 'Finance', value: 'Finance' },
          { title: 'Graphic Design', value: 'Graphic Design' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Strategy', value: 'Strategy' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2024',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / Company',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. UX Research, Figma, A/B Testing',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Hero image shown at the top of the page and on the work card',
    }),

    // ─── PAGE BUILDER ─────────────────────────────────────
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add, remove, and drag to reorder the sections of this case study.',
      of: [

        // ── 1. Role & Team ─────────────────────────────
        defineArrayMember({
          type: 'object',
          name: 'roleAndTeamSection',
          title: 'Role & Team',
          fields: [
            defineField({
              name: 'myRole',
              title: 'My Role',
              type: 'string',
              description: 'e.g. Lead UX Designer',
            }),
            defineField({
              name: 'team',
              title: 'Team Members',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'e.g. Sarah Chen — Product Manager',
            }),
            defineField({
              name: 'duration',
              title: 'Project Duration',
              type: 'string',
              description: 'e.g. 3 months (Jan–Mar 2024)',
            }),
            defineField({
              name: 'tools',
              title: 'Tools Used',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
              description: 'e.g. Figma, Miro, Notion',
            }),
          ],
          preview: {
            select: { subtitle: 'myRole' },
            prepare: ({ subtitle }) => ({
              title: 'Role & Team',
              subtitle: subtitle || 'No role set',
            }),
          },
        }),

        // ── 2. Problem & Goals ─────────────────────────
        defineArrayMember({
          type: 'object',
          name: 'problemGoalsSection',
          title: 'Problem & Goals',
          fields: [
            defineField({
              name: 'contentType',
              title: 'Content Mode',
              type: 'string',
              initialValue: 'structured',
              options: {
                list: [
                  { title: 'Structured fields', value: 'structured' },
                  { title: 'Rich text editor', value: 'richText' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            // Structured fields
            defineField({
              name: 'problem',
              title: 'The Problem',
              type: 'text',
              rows: 5,
              description: 'Describe the main problem this project solved',
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType === 'richText',
            }),
            defineField({
              name: 'constraints',
              title: 'Constraints',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Key constraints you worked within',
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType === 'richText',
            }),
            defineField({
              name: 'goals',
              title: 'Project Goals',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'What were you trying to achieve? List 3–5 goals.',
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType === 'richText',
            }),
            // Rich text field
            defineField({
              name: 'richText',
              title: 'Content',
              type: 'blockContent',
              description: 'Write freely — paste your text, add headings, bullets, and bold.',
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType !== 'richText',
            }),
          ],
          preview: {
            select: { contentType: 'contentType' },
            prepare: ({ contentType }) => ({
              title: 'Problem & Goals',
              subtitle: contentType === 'richText' ? 'Rich text' : 'Structured',
            }),
          },
        }),

        // ── 3. Gallery ─────────────────────────────────
        defineArrayMember({
          type: 'object',
          name: 'gallerySection',
          title: 'Gallery',
          fields: [
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'imageWithCaption' }],
              description: 'Upload images with optional captions',
            }),
          ],
          preview: {
            select: { images: 'images' },
            prepare: ({ images }) => ({
              title: 'Gallery',
              subtitle: images ? `${images.length} image${images.length !== 1 ? 's' : ''}` : 'No images',
            }),
          },
        }),

        // ── 4. Process ─────────────────────────────────
        defineArrayMember({
          type: 'object',
          name: 'processSection',
          title: 'Work Process',
          fields: [
            defineField({
              name: 'contentType',
              title: 'Content Mode',
              type: 'string',
              initialValue: 'structured',
              options: {
                list: [
                  { title: 'Structured fields', value: 'structured' },
                  { title: 'Rich text editor', value: 'richText' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            // Structured fields
            defineField({
              name: 'steps',
              title: 'Process Steps',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'phase', title: 'Phase / Step Name', type: 'string', description: 'e.g. Discovery & Research' }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                    defineField({
                      name: 'activities',
                      title: 'Activities (tags)',
                      type: 'array',
                      of: [{ type: 'string' }],
                      options: { layout: 'tags' },
                      description: 'e.g. User Interviews, Affinity Mapping',
                    }),
                  ],
                  preview: {
                    select: { title: 'phase' },
                    prepare: ({ title }) => ({ title: title || 'Untitled step' }),
                  },
                },
              ],
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType === 'richText',
            }),
            // Rich text field
            defineField({
              name: 'richText',
              title: 'Content',
              type: 'blockContent',
              description: 'Describe your process — paste your text, add headings and bullets.',
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType !== 'richText',
            }),
          ],
          preview: {
            select: { contentType: 'contentType' },
            prepare: ({ contentType }) => ({
              title: 'Work Process',
              subtitle: contentType === 'richText' ? 'Rich text' : 'Structured',
            }),
          },
        }),

        // ── 5. Solution ────────────────────────────────
        defineArrayMember({
          type: 'object',
          name: 'solutionSection',
          title: 'Solution',
          fields: [
            defineField({
              name: 'contentType',
              title: 'Content Mode',
              type: 'string',
              initialValue: 'structured',
              options: {
                list: [
                  { title: 'Structured fields', value: 'structured' },
                  { title: 'Rich text editor', value: 'richText' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            // Structured field
            defineField({
              name: 'solutionDescription',
              title: 'Solution Description',
              type: 'text',
              rows: 6,
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType === 'richText',
            }),
            // Rich text field
            defineField({
              name: 'richText',
              title: 'Content',
              type: 'blockContent',
              description: 'Describe the solution — paste your text, add headings and bullets.',
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType !== 'richText',
            }),
            // Metrics are available in both modes
            defineField({
              name: 'metrics',
              title: 'Success Metrics',
              type: 'array',
              description: 'Optional — shown alongside the description as stat cards',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. +34% or 2.3x' }),
                    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Increase in checkout completion' }),
                  ],
                  preview: {
                    select: { title: 'value', subtitle: 'label' },
                    prepare: ({ title, subtitle }) => ({ title: title || '—', subtitle }),
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { contentType: 'contentType' },
            prepare: ({ contentType }) => ({
              title: 'Solution',
              subtitle: contentType === 'richText' ? 'Rich text' : 'Structured',
            }),
          },
        }),

        // ── 6. Custom Content ──────────────────────────
        defineArrayMember({
          type: 'object',
          name: 'customContentSection',
          title: 'Custom Content',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              description: 'Optional heading shown above the content',
            }),
            defineField({
              name: 'richText',
              title: 'Content',
              type: 'blockContent',
              description: 'Full rich text — add headings, bullets, bold, images, and links.',
            }),
          ],
          preview: {
            select: { subtitle: 'heading' },
            prepare: ({ subtitle }) => ({
              title: 'Custom Content',
              subtitle: subtitle || 'No heading',
            }),
          },
        }),

        // ── 7. Takeaways ───────────────────────────────
        defineArrayMember({
          type: 'object',
          name: 'takeawaysSection',
          title: 'Takeaways',
          fields: [
            defineField({
              name: 'contentType',
              title: 'Content Mode',
              type: 'string',
              initialValue: 'structured',
              options: {
                list: [
                  { title: 'Structured fields', value: 'structured' },
                  { title: 'Rich text editor', value: 'richText' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            // Structured fields
            defineField({
              name: 'takeaways',
              title: 'Takeaways',
              type: 'array',
              description: 'Add at least 3 key learnings',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Validate assumptions early' }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                  ],
                  preview: {
                    select: { title: 'title' },
                    prepare: ({ title }) => ({ title: title || 'Untitled takeaway' }),
                  },
                },
              ],
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType === 'richText',
            }),
            // Rich text field
            defineField({
              name: 'richText',
              title: 'Content',
              type: 'blockContent',
              description: 'Write your reflections — paste your text, add headings and bullets.',
              hidden: ({ parent }: { parent: Record<string, unknown> }) => parent?.contentType !== 'richText',
            }),
          ],
          preview: {
            select: { contentType: 'contentType' },
            prepare: ({ contentType }) => ({
              title: 'Takeaways',
              subtitle: contentType === 'richText' ? 'Rich text' : 'Structured',
            }),
          },
        }),

      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});
