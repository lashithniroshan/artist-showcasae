import { useQuery } from "@tanstack/react-query"
import { trackApi } from "../api/trackApi"
import { albumApi } from "../api/albumApi";

export const useTrackSearch = (query: string) =>{
return useQuery({
    queryKey: ['search', 'tracks', query],
    queryFn: () => trackApi.search(query),
    select: (data) => data.results?.trackmatches?.track || [],
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000,
});
};

export const useAlbumSearch = (query: string) => {
    return useQuery({
        queryKey: ['search', 'albums', query],
    queryFn: () => albumApi.search(query),
    select: (data) => data.results?.albummatches?.album || [],
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000,
    });
};