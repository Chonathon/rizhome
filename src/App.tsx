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
import { Button, buttonVariants } from "@/components/ui/button"
import useArtists from "@/hooks/useArtists";
import useGenres from "@/hooks/useGenres";
import ArtistsForceGraph from "@/components/ArtistsForceGraph";
import GenresForceGraph from "@/components/GenresForceGraph";
import {BasicNode} from "@/types";

function App() {
  // App state for selected genre and artist
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<BasicNode | undefined>(undefined);
  const { genres, genresLoading, genresError } = useGenres();
  const { artists, artistLinks, artistsLoading, artistsError } = useArtists(selectedGenre);


  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* UI component for interacting with the graph*/}
      <GraphControls />

      {/* Breadcrumb navigation updates dynamically based on selected genre and artist */}
      <Breadcrumb className="fixed top-4 left-4 z-50 p-2 rounded-xl overflow-hidden">
        <BreadcrumbList>

          {/* Home icon - always visible */}
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => {
              setSelectedGenre(undefined)
              setSelectedArtist(undefined)
            }}>{<Waypoints size={20} />}</BreadcrumbLink>
          </BreadcrumbItem>

          {/* Show selected genre if available */}
          {selectedGenre && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {selectedArtist ? (
                  // Clickable link that sets selectedArtist to null
                  <BreadcrumbLink onClick={() => {
                    setSelectedArtist(undefined)
                    // TODO: Add logic to reset graph view to genre level
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
                <BreadcrumbPage>{selectedArtist.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Genres Graph */}
        {!selectedArtist && !selectedGenre && (
            <GenresForceGraph genres={genres} onNodeClick={setSelectedGenre} />
        )}

      {/* Artists Graph */}
        {selectedGenre && (
            <ArtistsForceGraph artists={artists} artistLinks={artistLinks} onNodeClick={setSelectedArtist} />
        )}
    </div>
  )
}

export default App
