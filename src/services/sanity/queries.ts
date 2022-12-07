export const queryAll = () => {
  return `
    *[_type == "song"] {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
};

export const querySearch = (query: string | string[] | undefined) => {
  return `
    *[_type == "song" && [title, artist] match "*${query}*"] {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
};
