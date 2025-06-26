import {Artist, BasicNode} from '@/types'
import { LastFMArtistJSON } from '@/types';
import { motion, AnimatePresence } from "framer-motion";
import { dummyLastFMArtistData } from '@/DummyDataForDummies'
import { X } from "lucide-react"
import {formatDate, formatNumber} from '@/lib/utils'
import {Loading} from "@/components/Loading";
import {AxiosError} from "axios";

interface ArtistCardProps {
    selectedArtist?: Artist;
    setSelectedArtist: (artist: string) => void;
    artistData?: LastFMArtistJSON;
    artistLoading: boolean;
    artistError?: AxiosError;
}

export function ArtistCard({
    selectedArtist,
    setSelectedArtist,
    artistData,
    artistLoading,
    artistError,
}: ArtistCardProps) {
    return (!selectedArtist || !artistData) ? null : (
     <AnimatePresence mode="wait">
         <motion.div
             initial={{ opacity: 0, y:3}}
             animate={{ opacity: 1, y:0}}
             exit={{ opacity: 0, y:3}}
             transition={{ duration: 0.4, ease: "easeOut" }}
             className='
             w-[420px] h-auto p-3 z-50 pb-4
             flex items-start gap-3
             bg-background rounded-3xl border border-gray-200
             '
         >
             {artistLoading ? (
                 <Loading />
             ) : (
                 <>
                     <div className="
                         w-24 h-full overflow-hidden
                         rounded-lg border border-gray-100
                     ">
                         <img
                             className="w-full h-full object-cover"
                             src={artistData.image[0].link}
                             alt={artistData.name}
                         />
                     </div>
                     {artistError ? <p>No last.fm data found for {selectedArtist.name}</p> : (
                         <div className='flex flex-col items-start gap-1'>
                             <div>
                                 <h2 className="text-md font-semibold w-full max-h-[20px] truncate">{artistData.name}</h2>
                                 {artistData.stats.listeners && (
                                     <h3 className="text-sm"> {formatNumber(artistData.stats.listeners)} listeners
                                     </h3>
                                 )}
                             </div>
                             <div className="
                             flex flex-col
                             text-sm text-muted-foreground
                         ">
                                 <p>Founded {selectedArtist.startDate ? formatDate(selectedArtist.startDate) : 'Unknown'} </p>
                                 <p>{artistData.bio ? artistData.bio.summary : 'No bio'}</p>

                                 {artistData.similar && (
                                     <p>
                                         Similar to {artistData.similar.slice(0, 3).map((name, index, array) => (
                                         <>
                                             <button key={name} onClick={() => setSelectedArtist(name)}>
                                                 {name}
                                             </button>
                                             {index < array.length - 1 ? ', ' : ''}
                                         </>
                                     ))}
                                     </p>
                                 )}
                             </div>
                         </div>
                     )}

                 </>
             )}
         </motion.div>
     </AnimatePresence>
    )
}