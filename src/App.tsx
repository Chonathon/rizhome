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
import {Artist, BasicNode} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ResetButton } from "@/components/ResetButton";
import { ListViewPanel } from "@/components/ListViewPanel";
import { useMediaQuery } from 'react-responsive';
import { ArtistCard } from './components/ArtistCard'
import { Gradient } from './components/Gradient'

function App() {
  // App state for selected genre and artist
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<Artist | undefined>(undefined);
  const { genres, genreLinks, genresLoading, genresError } = useGenres();
  const { artists, artistLinks, artistsLoading, artistsError } = useGenreArtists(selectedGenre);
  const { artistData, artistLoading, artistError } = useArtist(selectedArtist?.id);
  const [showListView, setShowListView] = useState(false);
  const [showArtistCard, setShowArtistCard] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 640 });
  // const [isLayoutAnimating, setIsLayoutAnimating] = useState(false);

  const setArtistFromName = (name: string) => {
    const artist = artists.find((artist) => artist.name === name);
    if (artist) {
      setSelectedArtist(artist);
    }
  }
  console.log("App render", {
  selectedGenre,
  selectedArtist,
  genres,
  genresLoading,
  genresError,
  artists,
  artistsLoading,
  artistsError,
  artistData,
  artistLoading,
  artistError
});
  return (
    <div className="relative min-h-screen min-w-screen bg-white">
       <Gradient />
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
  <>
      {!artistsLoading && (
          <ArtistsForceGraph
            artists={artists}
            artistLinks={artistLinks}
            loading={artistsLoading}
            onNodeClick={setSelectedArtist}
          />
      )}
  
        <AnimatePresence mode="popLayout">
          <motion.div
          // layout
          className={`
            fixed left-1/2 transform -translate-x-1/2 z-999
            flex gap-4
            ${isMobile
            ? "w-full px-4 items-center flex-col-reverse bottom-4"
            : "bottom-8  items-end"}`}>
              <motion.div
                // layout
                // initial={{ opacity: 1 }}
                // animate={{ opacity: isLayoutAnimating ? 0 : 1 }}
                // exit={{ opacity: 0 }}
                // onLayoutAnimationStart={() => setIsLayoutAnimating(true)}
                // onLayoutAnimationComplete={() => setIsLayoutAnimating(false)}
                // transition={{ layout: { duration: 0.2, ease: "easeInOut" }, opacity: { duration: 0.4 } }}
              >
                <ResetButton
                  onClick={() => {
                      setSelectedGenre(undefined);
                      setSelectedArtist(undefined);
                  }}
                />
              </motion.div>
              <ArtistCard
                  selectedArtist={selectedArtist}
                  setSelectedArtist={setSelectedArtist}
                  artistData={artistData}
                  artistLoading={artistLoading}
                  artistError={artistError}
              />
            </motion.div>
        </AnimatePresence>
  </>
)} 

      
    </div>
  )
}

export default App
