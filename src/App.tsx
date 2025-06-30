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
import {Artist, BasicNode, GraphType} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ResetButton } from "@/components/ResetButton";
import { ListViewPanel } from "@/components/ListViewPanel";
import { useMediaQuery } from 'react-responsive';
import { ArtistCard } from './components/ArtistCard'
import { Gradient } from './components/Gradient';
import { Search } from './components/Search';

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<Artist | undefined>(undefined);
  const [showListView, setShowListView] = useState(false);
  const [showArtistCard, setShowArtistCard] = useState(false);
  const [graph, setGraph] = useState<GraphType>('genres');
  const { genres, genreLinks, genresLoading, genresError } = useGenres();
  const { artists, artistLinks, artistsLoading, artistsError } = useGenreArtists(selectedGenre);
  const { artistData, artistLoading, artistError } = useArtist(selectedArtist?.id);

  const isMobile = useMediaQuery({ maxWidth: 640 });
  // const [isLayoutAnimating, setIsLayoutAnimating] = useState(false);

  const setArtistFromName = (name: string) => {
    const artist = artists.find((artist) => artist.name === name);
    if (artist) {
      setSelectedArtist(artist);
      setShowArtistCard(true);
    }
  }
  const onGenreNodeClick = (genre: string) => {
    setSelectedGenre(genre);
    setGraph('artists');
  }
  const onArtistNodeClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setShowArtistCard(true);
  }
  const resetAppState = () => {
    setGraph('genres');
    setSelectedGenre(undefined);
    setSelectedArtist(undefined);
    setShowArtistCard(false);
    setShowListView(false);
  }
  const deselectArtist = () => {
    setSelectedArtist(undefined);
    setShowArtistCard(false);
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
              selectedArtist={selectedArtist}
              HomeIcon={Waypoints}
              toggleListView={() => setShowListView(!showListView)}
              showListView={showListView}
              reset={resetAppState}
              hideArtistCard={deselectArtist}
          />
          <ListViewPanel
              genres={genres}
              onGenreClick={onGenreNodeClick}
              setSelectedArtist={setSelectedArtist}
              genreLinksCount={genreLinks.length}
              show={showListView && !genresError}
              genresLoading={genresLoading}
              artistsLoading={artistsLoading}
              currentGraph={graph}
              isMobile={isMobile}
          />
        </div>
        <GenresForceGraph
            genres={genres}
            links={genreLinks}
            onNodeClick={onGenreNodeClick}
            loading={genresLoading}
            show={graph === 'genres' && !genresError}
        />
        <ArtistsForceGraph
            artists={artists}
            artistLinks={artistLinks}
            loading={artistsLoading}
            onNodeClick={onArtistNodeClick}
            show={graph === 'artists' && !artistsError}
        />
        <AnimatePresence mode="popLayout">
          <motion.div
            className={`
              fixed left-1/2 transform -translate-x-1/2
              flex flex-col gap-4
              ${isMobile
                ? "w-full px-4 items-center bottom-4"
                : "bottom-8 items-end"}
            `}
          >
            <ArtistCard
              selectedArtist={selectedArtist}
              setArtistFromName={setArtistFromName}
              setSelectedArtist={setSelectedArtist}
              artistData={artistData}
              artistLoading={artistLoading}
              artistError={artistError}
              show={showArtistCard}
              setShowArtistCard={setShowArtistCard}
              deselectArtist={deselectArtist}
            />
            <div className={`flex gap-4 ${graph === 'artists' ? 'w-full' : ''}`}>
              <ResetButton
                onClick={() => resetAppState()}
                show={graph === 'artists'}
              />
              <motion.div
                className={`${graph === 'artists' ? 'flex-grow' : ''}`}
              >
                <Search className={`${graph === 'artists' ? 'w-full' : ''}`} />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
    </div>
  )
}

export default App
