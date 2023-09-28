export enum ResultKinds {
  Channel = 'youtube#channel',
  Video = 'youtube#video',
  Playlist = 'youtube#playlist',
}
export interface Filter {
  title: string;
  options: Option[];
  canChoseMany: boolean;
  oneOptionMustBeSelected: boolean;
}

export interface Option {
  title: string;
  value: string | null;
  key: string;
}
export interface SearchQueryObj {
  type?: string;
  special?: string;
  videoDuration?: string;
  publishedAfter?: string;
  order?: string;
}
export interface ErrorObject {
  message: string;
  type: string;
  status: number;
}
