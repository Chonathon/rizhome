import { BasicNode } from '@/types'
import { LastFMArtistJSON } from '@/types';
import { motion, AnimatePresence } from "framer-motion";
import { dummyLastFMArtistData } from '@/DummyDataForDummies'
import { X } from "lucide-react"
import { formatDate } from '@/lib/utils'

interface ArtistCardProps {
    selectedArtist?: BasicNode;
    setSelectedArtist: (artist: BasicNode | undefined) => void;
    artistData?: LastFMArtistJSON;
    }

const artist = dummyLastFMArtistData[0]


export function ArtistCard({
    selectedArtist,
    setSelectedArtist,
    artistData

}: ArtistCardProps) {
    if (!selectedArtist) return null
    return (
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
         <div className="
         w-24 h-full overflow-hidden
         rounded-lg border border-gray-100
         ">
             <img
             className="w-full h-full object-cover"
             src={artist?.image[0].link}
             alt={artist?.name}
             />
         </div>
         <div className='flex flex-col items-start gap-1'>
         <div>
             <h2 className="text-md font-semibold w-full max-h-[20px] truncate">{selectedArtist.name}</h2>
             {/* <h3 className="text-sm"> {formatNumber(artist.stats.listeners)} listeners
             </h3> */}
         </div>
                 <div className="
                 flex flex-col
                 text-sm text-muted-foreground
                 ">
                     <p>Founded {artist?.date ? formatDate(artist.date) : 'Unknown'} </p>
                     {/* <p>{artist?.bio?.content}</p> */}
                 <p>
                     Similar to {artist?.similar?.slice(0, 3).map((name, index, array) => (
                        <>
                             <button key={name}>
                                 {name}
                             </button>
                             {index < array.length - 1 ? ', ' : ''}
                        </>
                     ))}
                     
                 </p>
                 </div>
         </div>
             </motion.div>
     </AnimatePresence>
    )
}