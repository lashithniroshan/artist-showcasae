import { useQuery } from "@tanstack/react-query"
import { artistApi } from "../api/artistApi"

export const useArtistInfo = (artist: string) =>{
return useQuery({
queryKey: ['artist', 'info', artist],
queryFn: () => artistApi.getInfo(artist),
enabled: !!artist,
staleTime: 60 * 60 * 1000, 
});
};

export const useArtistSearch = (query: string) =>{
    return useQuery({
    queryKey: ['artist', 'search', query],
    queryFn: () => artistApi.search(query),
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000, 
    });
}