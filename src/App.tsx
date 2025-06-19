import './App.css'
import { useState } from 'react'
import { GraphControls } from './components/GraphControls'
import { Waypoints, Undo2 } from 'lucide-react'
import { BreadcrumbHeader } from './components/BreadcrumbHeader'
import { Button, buttonVariants } from "@/components/ui/button"
import useArtists from "@/hooks/useArtists";
import useGenres from "@/hooks/useGenres";
import ArtistsForceGraph from "@/components/ArtistsForceGraph";
import GenresForceGraph from "@/components/GenresForceGraph";
import {BasicNode} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ResetButton } from "@/components/ResetButton";
import useGenreArtistsCount from "@/hooks/useGenreArtistsCount";

function App() {
  // App state for selected genre and artist
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<BasicNode | undefined>(undefined);
  const { genres, genresLoading, genresError } = useGenres();
  const { artists, artistLinks, artistsLoading, artistsError } = useArtists(selectedGenre);
  const { genreArtistsCounts, genreArtistCountLoading, genreArtistCountError } = useGenreArtistsCount();

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
            <GenresForceGraph
                genres={genres}
                genreArtistCounts={genreArtistsCounts}
                onNodeClick={setSelectedGenre}
                loading={genresLoading}
            />
        )}

      {/* Artists Graph */}
{selectedGenre && (
  <AnimatePresence>
    <ArtistsForceGraph
      artists={artists}
      artistLinks={artistLinks}
      loading={artistsLoading}
      onNodeClick={setSelectedArtist}
    />
    <ResetButton 
      onClick={() => {
            setSelectedGenre(undefined);
            setSelectedArtist(undefined);
          }}
    />
  </AnimatePresence>
)}

    </div>
  )
}

export default App
