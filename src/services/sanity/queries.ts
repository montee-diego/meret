export const queryAll = () => {
  return `
    *[_type == "track"] {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
};

export const querySearch = (query: string | string[] | undefined) => {
  return `
    *[_type == "track" && [title, artist] match "*${query}*"] {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
};

export const queryUserPlaylists = (id: string) => {
  return `
    *[_type == "user" && _id == ${id}] {
      playlists
    }
  `;
};
