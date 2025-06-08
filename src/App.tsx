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
  const [selectedGenre, setSelectedGenre] = useState<string | null>("Doom Metal")
  const [selectedArtist, setSelectedArtist] = useState<string | null>("Boris")

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* UI component for interacting with the graph (e.g., selecting genre/artist) */}
      <GraphControls />
      {/* Breadcrumb navigation updates dynamically based on selected genre and artist */}
      <Breadcrumb className="fixed top-4 left-4 z-50 p-2 rounded-xl overflow-hidden">
        <BreadcrumbList>
          {/* Home icon - always visible */}
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{<Waypoints size={20} />}</BreadcrumbLink>
          </BreadcrumbItem>
          {/* Show selected genre if available */}
          {selectedGenre && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {selectedArtist ? (
                  <BreadcrumbLink href="#">{selectedGenre}</BreadcrumbLink>
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
    </div>
  )
}

export default App
