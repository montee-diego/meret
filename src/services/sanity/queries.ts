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
    *[_type=='playlist' && author._ref == "${id}"] | order(_createdAt asc) {
      ...,
      author->{name, image}
    }
  `;
};

export const queryPlaylist = () => {
  return `
    *[_type=='playlist' && _id == $id] {
      ...,
      "isAuthor": author._ref == $user,
      author->{name, image},
      "total": count(tracks),
      tracks[] {
        _key,
        ...@->{
          ...,
          "audio": audio.asset->url,
          "cover": cover.asset->url
        }
      }
    }
  `;
};
