export function queryHome() {
  return `
    {
      "tracks": *[_type == "track"][0...5] | order(_createdAt desc) {
        ...,
        "audio": audio.asset->url,
        "cover": cover.asset->url
      },
      "playlists": *[_type == "playlist" && count(tracks) > 0][0...10] | order(_updatedAt desc) {
        _id,
        _updatedAt,
        name,
        "cover": tracks[-1]->cover.asset->url,
        "total": count(tracks)
      }
    }
  `;
}

export function queryUserData() {
  return `
    {
      "playlists": *[_type=="playlist" && author._ref == $id] | order(_createdAt asc) {
        _id,
        name
      },
      ...*[_type=="user" && _id == $id][0] {
        "subscriptions": subs[]->{
          _id,
          name
        }
      }
    }
  `;
}

export function queryUserPlaylists() {
  return `
    *[_type=="playlist" && author._ref == $id] | order(_createdAt asc) {
      _id,
      name
    }
  `;
}

export function queryUserSubs() {
  return `
    *[_type=="user" && _id == $id][0] {
      subs[]->{_id, name}
    }
  `;
}

export function queryAll() {
  return `
    *[_type == "track"] {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
}

export function querySearch() {
  return `
    *[_type == "track" && [title, artist] match $query] {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
}

export function queryPlaylist() {
  return `
    *[_type=="playlist" && _id == $id][0] {
      ...,
      "user": coalesce(
        *[_type=="user" && _id == $user][0] {
          "isAuthor": ^.author._ref == $user,
          "isSub": $id in subs[]._ref
        },
        {
          "isAuthor": false,
          "isSub": false
        }
      ),
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
}

export function querySyncPlaylist() {
  return `
    *[_type=="playlist" && _id == $id][0] {
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
}

export function queryUserProfile() {
  return `
    {
      "user": *[_type=="user" && _id == $user][0] {
        _createdAt
      },
      "playlists": *[_type=="playlist" && author._ref == $user] | order(_createdAt asc) {
        _id,
        _updatedAt,
        name,
        "cover": tracks[-1]->cover.asset->url,
        "total": count(tracks)
      },
      ...*[_type=="user" && _id == $user][0] {
        "subscriptions": subs[]->{
          _id,
          _updatedAt,
          name,
          "cover": tracks[-1]->cover.asset->url,
          "total": count(tracks)
        }
      }
    }
  `;
}

export function queryDiscoverSong() {
  return `
    *[_type == "track"][0...10] | order(_createdAt desc) {
      ...,
      "audio": audio.asset->url,
      "cover": cover.asset->url
    }
  `;
}

export function queryDiscoverPlaylists() {
  return `*[_type == "playlist" && count(tracks) > 0][0...10] | order(_updatedAt desc) {
    _id,
    _updatedAt,
    name,
    "cover": tracks[-1]->cover.asset->url,
    "total": count(tracks)
  }`;
}
