export interface IDocument {
  _id: string;
  _updatedAt: string;
}

export interface IPlaylistMin {
  _id: string;
  name: string;
}

// temp interface, needs updating
export interface IPlaylistCard extends IDocument {
  author: {
    name: string;
    image: string;
  };
  cover?: string;
  name: string;
  total: number;
  tracks: ITrack[];
  user?: {
    isAuthor: boolean;
    isSub: boolean;
  };
}

export interface ITrack extends IDocument {
  // _key?: string;
  artist: string;
  audio: string;
  cover: string;
  date: string;
  genres: string[];
  length: number;
  // slug: {
  //   current: string;
  // };
  title: string;
}

export interface IPlaylistTrack extends ITrack {
  _key: string;
}

export interface IPlaylist extends IDocument {
  author: {
    name: string;
    image: string;
  };
  name: string;
  total: number;
  tracks: IPlaylistTrack[];
  user: {
    isAuthor: boolean;
    isSub: boolean;
  };
}

export interface ISelected {
  index: number;
  track: IPlaylistTrack | ITrack;
}
