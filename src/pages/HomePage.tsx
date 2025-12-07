import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlbums } from "../hooks/useAlbums";
import { Container } from "@chakra-ui/react";
import type { Album } from "../types/album";
import { AlbumGrid } from "../components/AlbumGrid";



export const HomePage :React.FC= () => {
 const navigate = useNavigate();
 const [defaultArtist] = useState('Coldplay');

 // Fetch default artist albums
 const { data: albums, isLoading, error } = useAlbums(defaultArtist);


 //Default view: Show artist albums
 const validAlbums = (albums || []).filter(album => album.artist !== undefined);

 return (
    <Container maxW="container.xl" py={8}>
        <AlbumGrid
      albums={validAlbums as Album[]}
       isLoading={isLoading}
        error={error}
         title={`Top Album by ${defaultArtist}`} 
         />
    </Container>
 )
}