import { Badge, Box, Button, Container, Flex, Heading, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { useFavourites } from "../hooks/useFavourites";


export const Header = ()=>{
    const { count } = useFavourites();

    return (
        <Box
        bgGradient="linear(to-r, brand.600, blue.600)"
      color="white"
      py={6}
      shadow="lg"
      position="sticky"
      top={0}
      zIndex={1000}
      >
         <Container maxW="container.xl">
            <Flex align="center" justify="space-between" flexWrap="wrap" gap={4}>
               <Heading size="lg" as={RouterLink} to="/" _hover={{ opacity: 0.8}}>
                 🎵 Artist Showcase
                </Heading> 

                <HStack spacing={4}>
                    <Button
                    as={RouterLink}
                    to="/"
                    variant="ghost"
                    _hover={{bg: 'whiteAlpha.200'}}
                    color="white"
                    >
Albums
                    </Button>
                     <Button
                    as={RouterLink}
                    to="/favourites"
                    variant="ghost"
                    _hover={{bg: 'whiteAlpha.200'}}
                    color="white"
                    position="relative"
                    >
Favourites
{count > 0 && (
    <Badge
    colorScheme="red"
                  position="absolute"
                  top="-1"
                  right="-1"
                  borderRadius="full"
    >
       {count} 
    </Badge>
)}
                    </Button>
                </HStack>
            </Flex>
            </Container>   
        </Box>
    )
}