import './App.css'
import { useState } from 'react'
import { GraphControls } from './components/GraphControls'
import { Waypoints } from 'lucide-react'
import { BreadcrumbHeader } from './components/BreadcrumbHeader'
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

        {/* Breadcrumb navigation */}
        <BreadcrumbHeader
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
            HomeIcon={Waypoints}
        />

      {/* Genres Graph */}
        {!selectedArtist && !selectedGenre && (
            <GenresForceGraph genres={genres} onNodeClick={setSelectedGenre} loading={genresLoading}/>
        )}

      {/* Artists Graph */}
        {selectedGenre && (
            <ArtistsForceGraph artists={artists} artistLinks={artistLinks} loading={artistsLoading}
 onNodeClick={setSelectedArtist} />
        )}
    </div>
  )
}

export default App
