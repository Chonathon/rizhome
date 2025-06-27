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

interface ArtistCardProps {
    selectedArtist?: Artist;
    setSelectedArtist: (artist: string | undefined) => void;
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
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    return (!selectedArtist || !artistData) ? null : (
     <AnimatePresence mode="wait">
         <motion.div
             initial={{ opacity: 0, y:3}}
             animate={{ opacity: 1, y:0}}
             exit={{ opacity: 0, y:3}}
             transition={{ duration: 0.4, ease: "easeOut" }}
             className={`
             w-[420px] h-auto p-3 z-50 pb-4
            flex items-start gap-3
            bg-gray-50/90 backdrop-blur-xs shadow-lg rounded-3xl border border-gray-200
             max-w-full overflow-hidden
             ${isExpanded ? 'flex-col' : ''}
             `}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             >
             {artistLoading ? (
                 <Loading />
                ) : (
                 <>
                   {isHovered &&
                        <div className="w-full flex justify-end absolute  top-0 pr-3">
                        <Button
                            className='hover:bg-white/0'
                            variant="ghost" 
                            size="icon"         
                            onClick={() => (
                                setSelectedArtist(undefined),
                                setIsHovered(false)
                            )}
                            >
                            <CircleX className=' fill-gray-500 text-white overflow-hidden size-5' size={20} />
                            </Button>
                        </div>}
                     <div className={`
                         w-24 h-24 shrink-0 overflow-hidden
                         rounded-lg border border-gray-100
                         ${isExpanded ? 'w-full h-[160px]' : ''}
                     `}>
                         <img
                             className={`w-24 h-24 object-cover
                                ${isExpanded ? 'w-full h-full object-cover aspect-[4/3]' : ''}`}
                             src={artistData.image[0].link}
                             alt={artistData.name}
                         />
                     </div>
                     {artistError ? <p>No last.fm data found for {selectedArtist.name}</p> : (
                         <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
                                 <h2 className="w-full text-md font-semibold">{artistData.name}</h2>
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
                                 <p 
                                 onClick={() => setIsExpanded(prev => !prev)}
                                 className=
                                 {`break-words cursor-pointer hover:text-gray-400 ${isExpanded ? "text-muted-foreground" : "line-clamp-3 overflow-hidden"}`}>{artistData.bio ? artistData.bio.summary : 'No bio'}</p>

                             </div>
                         </div>
                     )}

                 </>
             )}
         </motion.div>
     </AnimatePresence>
    )
}