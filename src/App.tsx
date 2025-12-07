import { useState, startTransition, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { HomePage } from './pages/HomePage'
import { AlbumDetailPage } from './pages/AlbumDetailPage'

function AppContent(){
 


return (
<Box minH="100vh" bg="gray.50">
<Routes>
  <Route path="/" element={ <HomePage />} />
  <Route path="/album/:artist/:album" element={ <AlbumDetailPage />} />
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
