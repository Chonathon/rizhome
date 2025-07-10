import {Artist, BasicNode} from '@/types'
import { LastFMArtistJSON } from '@/types';
import { motion, AnimatePresence } from "framer-motion";
import { dummyLastFMArtistData } from '@/DummyDataForDummies'
import { CircleX } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button";
import {formatDate, formatNumber} from '@/lib/utils'
import {Loading} from "@/components/Loading";
import {AxiosError} from "axios";
import { useState } from "react"
import { useMediaQuery } from 'react-responsive';
import { Skeleton } from './ui/skeleton';
import { useRef, useLayoutEffect } from "react";


interface ArtistCardProps {
    selectedArtist?: Artist;
    setArtistFromName: (artist: string) => void;
    setSelectedArtist: (artist: Artist | undefined) => void;
    artistData?: LastFMArtistJSON;
    artistLoading: boolean;
    artistError?: AxiosError;
    show: boolean;
    setShowArtistCard: (show: boolean) => void;
    deselectArtist: () => void;
    similarFilter: (artists: string[]) => string[];
}

export function ArtistCard({
    selectedArtist,
    setArtistFromName,
    setSelectedArtist,
    artistData,
    artistLoading,
    artistError,
    show,
    setShowArtistCard,
    deselectArtist,
    similarFilter,
}: ArtistCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardHeight, setCardHeight] = useState<number | null>(null);
    useLayoutEffect(() => {
      if (cardRef.current && !artistLoading) {
        setCardHeight(cardRef.current.offsetHeight);
      }
    }, [artistLoading]);

    const onDeselectArtist = () => {
        setIsHovered(false);
        setIsExpanded(false);
        deselectArtist();
    }
    return !show ? null : (
      <AnimatePresence mode="wait">
        <motion.div
          ref={cardRef}
          style={{ height: artistLoading && cardHeight ? `${cardHeight}px` : "auto"}}
          layout
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 24,
            mass: 0.8,
          }}
          // TODO: loading animation could use love
          className={`
            w-[420px] min-h-[126px] h-auto  p-3 z-50 pb-4
            bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-xs shadow-lg rounded-3xl border border-border
             max-w-full overflow-hidden
             ${artistLoading && "animate-pulse bg-stone-50/86"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {(isHovered || isMobile) && (
            <div className="w-full flex justify-end absolute top-0 pr-3">
              <Button
                className="hover:bg-white/0"
                variant="ghost"
                size="icon"
                onClick={() => {
                  onDeselectArtist();
                  setIsExpanded(false);
                }}
              >
                <CircleX
                  className=" fill-gray-500 dark:fill-gray-900 text-white dark:text-foreground overflow-hidden size-5"
                  size={20}
                />
              </Button>
            </div>
          )}
          {/* TODO: this animation isn't working as intented */}
          <motion.div
            key={selectedArtist?.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              layout: { duration: 0, ease: "easeOut" },
              opacity: { delay: 0.3, duration: 0.3, ease: "easeOut" },
            }}
            layout
            className={`
                     
                    flex items-start gap-3
                    ${isMobile ? "w-full" : ""}
                    ${isExpanded ? "flex-col" : ""}
                    `}
          >
            {/* Dismiss button shouldn't animate with content */}

            {/* Artist Image */}
            {artistError ? (
              <div className="w-full h-full flex justify-center p-4 min-w-0">
                <p>Can't find {selectedArtist && selectedArtist.name} 🤔</p>
              </div>
            ) : (
              <>
                {artistLoading ? (
                  <>
                    {/* <Skeleton className={`w-24 h-24 shrink-0 rounded-xl`} /> */}
                    {/* <Loading /> */}
                    {/* <div className="flex-1 flex flex-col items-start gap-2 min-w-0 w-full">
                      <Skeleton className="h-[22px] w-3/4" />
                      <Skeleton className="h-[18px] w-full" />
                      <Skeleton className="h-[18px] w-full" />
                      <div className='w-full pr-32'>
                        <Skeleton className="h-[18px] w-full" />
                      </div>
                    </div> */}
                  </>
                ) : (
                  <>
                    {artistData?.image && artistData && (
                      <div
                        className={`
                      w-24 h-24 shrink-0 overflow-hidden
                      rounded-xl border border-border
                      ${isExpanded ? "w-full h-[200px]" : ""}
                    `}
                      >
                        <img
                          className={`w-24 h-24 object-cover
                        ${isExpanded ? "w-full h-full" : ""}`}
                          src={artistData.image}
                          alt={artistData.name}
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
                      {/* Artist Name */}
                      <h2 className="w-full text-md font-semibold">
                        {artistData && artistData.name}
                      </h2>
                      {/* Artist Stats */}
                      <div className="text-sm">
                        {artistData && artistData.stats.listeners && (
                          <h3>
                            <span className="font-medium">Listeners:</span>{" "}
                            {formatNumber(artistData.stats.listeners)}
                          </h3>
                        )}
                        <h3>
                          <span className="font-medium">Founded:</span>{" "}
                          {selectedArtist && selectedArtist.startDate
                            ? formatDate(selectedArtist.startDate)
                            : "Unknown"}{" "}
                        </h3>
                        {artistData && artistData.similar && (
                          <h3>
                            <span className="font-medium">Similar:</span>{" "}
                            {similarFilter(artistData.similar)
                              .slice(0, 3)
                              .map((name, index, array) => (
                                <>
                                  <button
                                    key={index + name}
                                    onClick={() => setArtistFromName(name)}
                                  >
                                    {name}
                                  </button>
                                  {index < array.length - 1 ? ", " : ""}
                                </>
                              ))}
                          </h3>
                        )}
                      </div>
                      <div
                        className="
                      w-full
                      flex flex-col
                      text-sm
                      "
                      >
                        <p
                          onClick={() => setIsExpanded((prev) => !prev)}
                          className={`break-words text-muted-foreground cursor-pointer hover:text-gray-400 ${
                            isExpanded
                              ? "text-muted-foreground"
                              : "line-clamp-3 overflow-hidden"
                          }`}
                        >
                          {artistData && artistData.bio
                            ? artistData.bio.summary
                            : "No bio"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
}