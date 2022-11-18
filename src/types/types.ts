export interface ISong {
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

export interface IPlaylist {
  name: string;
  id: string;
  songs: ISong[];
}
