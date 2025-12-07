import { lastFmClient } from "./lastfmClient";
import type { AlbumDetail, Album } from "../types/album";

export interface AlbumInfoResponse {
  album: AlbumDetail;
}

export interface AlbumSearchResponse {
  results: {
    albummatches: {
      album: Album[];
    };
    "@attr": {
      for: string;
    };
  };
}

export const albumApi = {
  getInfo: async (artist: string, album: string) => {
    return lastFmClient.request<AlbumInfoResponse>({
      method: "album.getInfo",
      artist,
      album,
    });
  },

  search: async (album: string, limit: number = 30) => {
    return lastFmClient.request<AlbumSearchResponse>({
      method: "album.search",
      album,
      limit,
    });
  },

  getTopTags: async (artist: string, album: string) => {
    return lastFmClient.request<AlbumInfoResponse>({
      method: "album.getTopTags",
      artist,
      album,
    });
  },
};
