import { useQuery } from "@tanstack/react-query";
import { artistApi } from "../api/artistApi";

export const useAlbums = ( artist: string, limit = 50) =>{
return useQuery({
queryKey: ['albums', artist, limit],
queryFn: () => artistApi.getTopAlbums(artist, limit),
select: (data) => data.topalbums?.album || [],
enabled: !!artist,
staleTime: 10 * 60 * 1000,
});
};