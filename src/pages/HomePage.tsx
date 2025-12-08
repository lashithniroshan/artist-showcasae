import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlbums } from "../hooks/useAlbums";
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import type { Album } from "../types/album";
import { AlbumGrid } from "../components/AlbumGrid";
import { useAlbumSearch, useTrackSearch } from "../hooks/useSearch";
import { TrackList } from "../components/TrackList";

interface HomePageProps {
    searchQuery?: string;
}

export const HomePage :React.FC<HomePageProps> = ({searchQuery = ''}) => {
 const navigate = useNavigate();
 const [defaultArtist] = useState('Coldplay');

 // Fetch default artist albums
 const { data: albums, isLoading, error } = useAlbums(defaultArtist);

 // Search queries
 const { data: searchTracks, isLoading: isSearchingTrack } = useTrackSearch(searchQuery);
 const { data: searchAlbums, isLoading: isSearchingAlbums } = useAlbumSearch(searchQuery);

 const handleAlbumClick = (album: Album) => {
 const artistName = typeof album.artist === 'string' ? album.artist : album.artist.name;
 navigate(`/album/${encodeURIComponent(artistName)}/${encodeURIComponent(album.name)}`);
}

if (searchQuery && searchQuery.length > 2){
    return (
        <Container maxW="container.xl" py={8}>
<VStack spacing={8} align="stretch">
    <Tabs colorScheme="brand">
<TabList>
    <Tab>
        Tracks ({searchTracks?.length || 0})
    </Tab>
    <Tab>
        Albums ({searchAlbums?.length || 0})
    </Tab>
</TabList>
<TabPanels>
    <TabPanel px={0}>
<Box  bg="white" borderRadius="lg" shadow="md" p={6}>
   {isSearchingTrack ? (
    <Box textAlign="center" py={8}>Loading tracks...</Box>
   ): searchTracks && searchTracks.length > 0 ? (
    <TrackList tracks={searchTracks} />
   ):(
    <Box textAlign="center" py={8} color="gray.500">
        No tracks found for "{searchQuery}"
    </Box>
   )} 
</Box>
</TabPanel>
<TabPanel px={0}>
{isSearchingAlbums ? (
    <Box textAlign="center" py={8}>Loading albums...</Box>
): searchAlbums && searchAlbums.length > 0 ? (
    <AlbumGrid
    albums={searchAlbums}
    onAlbumClick={handleAlbumClick}
    title=""
     />
):(
    <Box bg="white" borderRadius="lg" shadow="md" p={8}>
<Box textAlign="center" color="gray.500">
No albums found for "{searchQuery}"
</Box>
    </Box>
)}
</TabPanel>
</TabPanels>
</Tabs>
</VStack>
        </Container>
    );
}

 //Default view: Show artist albums
 const validAlbums = (albums || []).filter(album => album.artist !== undefined);

 return (
    <Container maxW="container.xl" py={8}>
        <AlbumGrid
      albums={validAlbums as Album[]}
      onAlbumClick={handleAlbumClick}
       isLoading={isLoading}
        error={error}
         title={`Top Albums by ${defaultArtist}`} 
         />
    </Container>
 )
}