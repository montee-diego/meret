export interface IPlaylist {
  name: string;
  id: string;
  songs: ITrack[];
}

export interface ITrack {
  _id: string;
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
