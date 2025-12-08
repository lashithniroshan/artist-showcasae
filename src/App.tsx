import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { HomePage } from './pages/HomePage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { Header } from './components/Header';
import { startTransition, useEffect, useState } from 'react';


function AppContent(){
 const [searchQuery, setSearchQuery] = useState("");
 const location = useLocation();

 useEffect(()=>{
  if(location.pathname !== '/'){
    startTransition(()=>{
      setSearchQuery('')
    });
  }
 },[location.pathname])

 const handleSearch = (query: string)=>{
setSearchQuery(query)
 }

 // only show search on home page
 const showSearch = location.pathname === '/';
 
return (
<Box minH="100vh" bg="gray.50">
  <Header onSearch={showSearch ? handleSearch : undefined} />
<Routes>
  <Route path="/" element={ <HomePage searchQuery={searchQuery} />} />
  <Route path="/album/:artist/:album" element={ <AlbumDetailPage />} />
  <Route path="/favourites" element={ <FavouritesPage />} />
</Routes>
</Box>
)
}

function App() {

  return (
    <BrowserRouter>
    <AppContent />
    </BrowserRouter>
  )
}

export default App
