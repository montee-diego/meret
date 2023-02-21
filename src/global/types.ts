export interface IDocument {
  _id: string;
  _updatedAt: string;
}

export interface IPlaylistMin {
  _id: string;
  name: string;
}

export interface IPlaylistCard extends IDocument {
  cover: string | null;
  name: string;
  total: number;
}

export interface ITrack extends IDocument {
  _key?: string;
  artist: string;
  audio: string;
  cover: string;
  date: string;
  genres: string[];
  length: number;
  title: string;
}

export interface IPlaylist extends IDocument {
  author: {
    name: string;
    image: string;
  };
  name: string;
  total: number;
  tracks: ITrack[];
  user: {
    isAuthor: boolean;
    isSub: boolean;
  };
}

export interface ISelected {
  index: number;
  track: ITrack;
}
