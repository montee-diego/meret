export default {
  name: "playlist",
  title: "Playlist",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "user" }],
    },
    {
      name: "tracks",
      title: "Tracks",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "track" }],
        },
      ],
    },
  ],
};
