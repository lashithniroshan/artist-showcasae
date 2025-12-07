import { useQuery } from "@tanstack/react-query";
import { albumApi } from "../api/albumApi";

export const useAlbumDetail = ( artist: string, album: string) =>{
return useQuery({
queryKey: ['album', 'detail', artist, album],
queryFn: () => albumApi.getInfo(artist, album),
select: (data) => data.album,
enabled: !!artist && !!album,
staleTime: 15 * 60 * 1000, 
});
}