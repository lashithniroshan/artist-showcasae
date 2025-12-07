import { lastFmClient } from "./lastfmClient";
import type { Artist } from "../types/artist";
import type { Album } from "../types/album";

export interface ArtistTopAlbumsResponse {
  topalbums: {
    album: Album[];
    "@attr": {
      artist: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export interface ArtistInfoResponse {
  artist: Artist;
}
export interface ArtistSearchResponse {
  results: {
    artistmatches: {
      artist: Artist[];
    };
    "@attr": {
      for: string;
    };
  };
}

export const artistApi = {
  getTopAlbums: async (artist: string, limit: number = 30): Promise<ArtistTopAlbumsResponse> => {
    return lastFmClient.request<ArtistTopAlbumsResponse>({
      method: "artist.getTopAlbums",
      artist,
      limit,
    });
  },

  getInfo: async (artist: string): Promise<ArtistInfoResponse> => {
    return lastFmClient.request<ArtistInfoResponse>({
      method: "artist.getInfo",
      artist,
    });
  },

  search: async (artist: string, limit: number = 30): Promise<ArtistSearchResponse> => {
    return lastFmClient.request<ArtistSearchResponse>({
      method: "artist.search",
      artist,
      limit,
    });
  },
};  