import './App.css'
import { useState } from 'react'
import { GraphControls } from './components/GraphControls'
import {  Breadcrumb,
          BreadcrumbList,
          BreadcrumbItem,
          BreadcrumbLink,
          BreadcrumbPage,
          BreadcrumbSeparator,
          BreadcrumbEllipsis } from './components/ui/breadcrumb'
import { Waypoints } from 'lucide-react'

function App() {
  // App state for selected genre and artist
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* UI component for interacting with the graph (e.g., selecting genre/artist) */}
      <GraphControls />
      {/* Breadcrumb navigation updates dynamically based on selected genre and artist */}
      <Breadcrumb className="fixed top-4 left-4 z-50 p-2 rounded-xl overflow-hidden">
        <BreadcrumbList>
          {/* Home icon - always visible */}
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => {
              setSelectedGenre(null)
              setSelectedArtist(null)
            }}>{<Waypoints size={20} />}</BreadcrumbLink>
          </BreadcrumbItem>
          {/* Show selected genre if available */}
          {selectedGenre && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {selectedArtist ? (
                  <BreadcrumbLink onClick={() => {
                    // setSelectedGenre(null)
                    setSelectedArtist(null) 
                  }}>{selectedGenre}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{selectedGenre}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </>
          )}
          {/* Show selected artist if available */}
          {selectedGenre && selectedArtist && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedArtist}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      {/* Placeholder Genre / Artist Navigation Helpers */}
      {!selectedArtist && !selectedGenre && <button
        className="fixed top-80 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        onClick={() => {
          setSelectedGenre("Doom Metal")
          setSelectedArtist(null)
        }}
      >Doom Metal</button>}
      {selectedGenre && <button
        className="fixed top-64 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        onClick={() => {
          setSelectedGenre("Doom Metal")
          setSelectedArtist("Boris")
        }}
      >Boris</button>}
    </div>
  )
}

export default App
