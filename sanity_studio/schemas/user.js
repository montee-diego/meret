export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string",
    },
    {
      name: "subs",
      title: "Subscriptions",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "playlist" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
};
