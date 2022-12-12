export default {
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    {
      name: "artist",
      title: "Artist",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "audio",
      title: "Audio",
      type: "file",
      options: {
        accept: "audio/*",
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "cover",
      title: "Cover",
      type: "image",
      options: {
        accept: "image/webp",
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "genres",
      title: "Genres",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "length",
      title: "Length",
      type: "number",
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => `${doc.artist}/${doc.title}`,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
  ],
};
