export interface IPlaylist {
  _id: string;
  author: {
    name: string;
    image: string;
  };
  name: string;
  tracks: ITrack[];
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
