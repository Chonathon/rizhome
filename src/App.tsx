import './App.css'
import { useState } from 'react'
import { GraphControls } from './components/GraphControls'
import { Waypoints, Undo2 } from 'lucide-react'
import { BreadcrumbHeader } from './components/BreadcrumbHeader'
import { Button, buttonVariants } from "@/components/ui/button"
import useGenreArtists from "@/hooks/useGenreArtists";
import useGenres from "@/hooks/useGenres";
import useArtist from "@/hooks/useArtist";
import ArtistsForceGraph from "@/components/ArtistsForceGraph";
import GenresForceGraph from "@/components/GenresForceGraph";
import {BasicNode} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ResetButton } from "@/components/ResetButton";
import { ListViewPanel } from "@/components/ListViewPanel";
import { useMediaQuery } from 'react-responsive';


function App() {
  // App state for selected genre and artist
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<BasicNode | undefined>(undefined);
  const { genres, genreLinks, genresLoading, genresError } = useGenres();
  const { artists, artistLinks, artistsLoading, artistsError } = useGenreArtists(selectedGenre);
  const { artistData, artistLoading, artistError } = useArtist(selectedArtist?.id);
  const [showListView, setShowListView] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* UI component for interacting with the graph*/}
      {/* <GraphControls /> */}

        {/* Breadcrumb navigation */}
        <div className={
          isMobile 
            ? "fixed top-4 left-4 max-w-[calc(100vw-32px)] z-50 inline-flex flex-col gap-2 items-start"
            : "fixed top-4 left-4 z-50 inline-flex flex-col gap-2 items-start"
        }>
          <BreadcrumbHeader
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedArtist={selectedArtist}
              setSelectedArtist={setSelectedArtist}
              HomeIcon={Waypoints}
              toggleListView={() => setShowListView(!showListView)}
              showListView={showListView}
          />
          {showListView && !genresLoading && !genresError &&
                  (<ListViewPanel
                  genres={genres}
                  selectedGenre={selectedGenre}
                  selectedArtist={selectedArtist}
                  genreLinksCount={genreLinks.length}
                  />)}
        </div>

      {/* Genres Graph */}
        {!selectedArtist && !selectedGenre && (
            <GenresForceGraph
                genres={genres}
                links={genreLinks}
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
