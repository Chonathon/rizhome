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
             max-w-full
             '
         >
             {artistLoading ? (
                 <Loading />
             ) : (
                 <>
                     <div className="
                         w-24 h-24 shrink-0 overflow-hidden
                         rounded-lg border border-gray-100
                     ">
                         <img
                             className="w-24 h-24 object-cover"
                             src={artistData.image[0].link}
                             alt={artistData.name}
                         />
                     </div>
                     {artistError ? <p>No last.fm data found for {selectedArtist.name}</p> : (
                         <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
                                 <h2 className="text-md font-semibold max-h-[20px] truncate">{artistData.name}</h2>
                                 <div className='text-sm'>
                                     {artistData.stats.listeners && (
                                         <h3><span className='font-medium'>Listeners:</span> {formatNumber(artistData.stats.listeners)}
                                         </h3>
                                     )}
                                     <h3><span className='font-medium'>Founded:</span> {selectedArtist.startDate ? formatDate(selectedArtist.startDate) : 'Unknown'} </h3>
                                                                  {artistData.similar && (
                                     <h3>
                                         <span className='font-medium'>Similar:</span> {artistData.similar.slice(0, 3).map((name, index, array) => (
                                         <>
                                             <button key={name} onClick={() => setSelectedArtist(name)}>
                                                 {name}
                                             </button>
                                             {index < array.length - 1 ? ', ' : ''}
                                         </>
                                     ))}
                                     </h3>                          
                                    )}
                             </div>
                             <div className="
                             w-full
                             flex flex-col
                             text-sm text-muted-foreground
                             ">
                                 <p className='line-clamp-5 overflow-hidden'>{artistData.bio ? artistData.bio.summary : 'No bio'}</p>

                             </div>
                         </div>
                     )}

                 </>
             )}
         </motion.div>
     </AnimatePresence>
    )
}