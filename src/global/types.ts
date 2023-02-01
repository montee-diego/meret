export interface IDocument {
  _id: string;
  _updatedAt: string;
}

export interface IPlaylistMin {
  _id: string;
  name: string;
}

export interface IPlaylist extends IDocument {
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
  _key?: string;
  artist: string;
  audio: string;
  cover: string;
  date: string;
  genres: string[];
  length: number;
  slug: {
    current: string;
  };
  title: string;
}
