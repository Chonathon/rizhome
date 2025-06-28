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
    const isMobile = useMediaQuery({ maxWidth: 640 });
    return (!selectedArtist || !artistData) ? null : (
     <AnimatePresence mode="popLayout">
         <motion.div
            // key={ArtistCard}
            layout
             initial={{ opacity: 0, scale:.9 }}
             animate={{ opacity: 1, scale:1 }}
             exit={{ opacity: 0, scale:0 }}
             transition={{ duration: .2, ease: "easeInOut" }}
             className={`
            w-[420px] min-h-[126px] h-auto  p-3 z-50 pb-4
            bg-gray-50/90 backdrop-blur-xs shadow-lg rounded-3xl border border-gray-200
             max-w-full overflow-hidden
             `}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             >
                 <AnimatePresence mode="wait">
                     <motion.div 
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        layout
                     className={`
                     
                    flex items-start gap-3
                    ${isMobile ? 'w-full' : ''}
                    ${isExpanded ? 'flex-col' : ''}
                    `}>

                       {(isHovered || isMobile) && (
                            <div className="w-full flex justify-end absolute top-0 pr-3">
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
                        </div>
                       )}
                        {/* Artist Image */}
                         {artistError 
                         ? <div className='w-full h-full flex justify-center p-4'>
                             <p>Can't find that artist 🤔</p>
                         </div> 
                         : <>
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
                                 <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
                                {/* Artist Name */}
                                    {artistLoading
                                    ? <Skeleton className='h-[24px] w-full'/>
                                    : <h2 className="w-full text-md font-semibold">{artistData.name}</h2>}
                                         {/* Artist Stats */}
                                         {artistLoading
                                         ? <>
                                             <Skeleton className='h-[20px] w-full'/>
                                             <Skeleton className='h-[20px] w-full'/>
                                                <Skeleton className='h-[20px] w-full'/>
                                         </>
                                         : <div className='text-sm'>
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
                                            </div>}
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
                         </>}
                     </motion.div>
                 </AnimatePresence>
         </motion.div>
     </AnimatePresence>
    )
}