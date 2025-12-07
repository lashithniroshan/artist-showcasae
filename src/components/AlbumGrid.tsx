import { useMemo, useState } from "react";
import type { Album } from "../types/album";
import { Grid, Box, Heading, Select, Flex, Spinner, Alert, AlertIcon, Text  } from "@chakra-ui/react";
import { AlbumCard } from "./AlbumCard";

interface AlbumGridProps {
    albums: Album[];
    isLoading?: boolean;
    error?: Error | null;
    title?: string;
}

type SortOption = 'playcount' | 'name';

export const AlbumGrid = ({ 
        albums,
         isLoading,
          error ,
         title = 'Albums'
         }:AlbumGridProps) => {
         const [sortBy, setSortBy] = useState<SortOption>('playcount');

         const sortedAlbums =  useMemo(() => {
            if (!albums) return [];

          return [...albums].sort((a, b) => {
            if (sortBy === 'name') {
              return a.name.localeCompare(b.name);
            } 
            const aCount = parseInt(a.playcount || '0');
            const bCount = parseInt(b.playcount || '0');
            return bCount - aCount;
          });
        }, [albums, sortBy]);

        if(isLoading) {
            return (
                <Flex justify="center" align="center" minH="400px">
                    <Spinner size="xl" color="brand.600" thickness="4px" />
                </Flex>
            );
        }

        if(error) {
            return (
                <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    <Text>Failed to load albums: {error.message}</Text>
                </Alert>
            );
        }

        if(!albums || albums.length === 0) {
            return (
                <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    <Text>No albums found.</Text>
                </Alert>
            );
        }

        return (
            <Box>
                <Flex justify="space-between" align="center" mb={6}>    
                    <Heading as="h2" size="lg">{title}</Heading>
                    <Select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        maxW="200px"
                    >
                        <option value="playcount">Most Popular</option>
                        <option value="name">Alphabetical</option>
                    </Select>
                    </Flex>

                    <Grid
                        templateColumns={{
base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
                        }}
                        gap={6}
                        >
                            {sortedAlbums.map((album, index) => (
                                <AlbumCard
                                 key={`${album.name}-${index}`}
                                  album={album} 
                                  />
                            ))}

                    </Grid>
                    </Box>
            )
        
};