import { BasicNode } from '@/types'
import { LastFMArtistJSON } from '@/types';
import { motion, AnimatePresence } from "framer-motion";

interface ArtistCardProps {
          selectedArtist?: BasicNode;
          artistData?: LastFMArtistJSON;
    }

// Format number with commas
// TODO: global number formatting utility
const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US').format(value);

// Format date to "MMM dd, yyyy"
// TODO: global date formatting utility
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}; 
const dummyLastFMArtistData = [
  {
    name: "Arcade Fire",
    mbid: "mbid-arcade-fire-001",
    image: [
      { link: "https://lastfm.freetls.fastly.net/i/u/770x0/e3892e238391a0a79ad7af3267c923e9.jpg#e3892e238391a0a79ad7af3267c923e9", size: "small" },
      { link: "https://example.com/arcade-fire-medium.jpg", size: "medium" },
      { link: "https://example.com/arcade-fire-large.jpg", size: "large" }
    ],
    ontour: false,
    stats: {
      listeners: 1234567,
      playcount: 6543210
    },
    bio: {
      link: "https://www.last.fm/music/Arcade+Fire/+wiki",
      summary: "Arcade Fire is a Canadian indie rock band...",
      content: "Arcade Fire is an indie rock band formed in Montreal in 2001. Known for their energetic live shows and layered instrumentation..."
    },
    similar: ["Broken Social Scene", "The National", "Beirut"],
    date: "2025-06-22T14:00:00Z"
  },
  {
    name: "The Strokes",
    mbid: "mbid-the-strokes-002",
    image: [
      { link: "https://lastfm.freetls.fastly.net/i/u/300x300/0666e67598564b94c88a3c5d041f6872.png", size: "small" },
      { link: "https://example.com/strokes-medium.jpg", size: "medium" },
      { link: "https://example.com/strokes-large.jpg", size: "large" }
    ],
    ontour: true,
    stats: {
      listeners: 2345678,
      playcount: 7654321
    },
    bio: {
      link: "https://www.last.fm/music/The+Strokes/+wiki",
      summary: "The Strokes are an American rock band...",
      content: "The Strokes emerged in the early 2000s garage rock revival, becoming one of the most influential bands of the era..."
    },
    similar: ["The Libertines", "Franz Ferdinand", "Interpol"],
    date: "2025-06-22T14:00:00Z"
  },
  {
    name: "Tame Impala",
    mbid: "mbid-tame-impala-003",
    image: [
      { link: "https://lastfm.freetls.fastly.net/i/u/300x300/d7a74c9f02e845d3a78c62576b180b10.png", size: "small" },
      { link: "https://example.com/tame-medium.jpg", size: "medium" },
      { link: "https://example.com/tame-large.jpg", size: "large" }
    ],
    ontour: true,
    stats: {
      listeners: 3456789,
      playcount: 8765432
    },
    bio: {
      link: "https://www.last.fm/music/Tame+Impala/+wiki",
      summary: "Tame Impala is the psychedelic music project of Kevin Parker...",
      content: "Formed in Perth, Tame Impala blends psychedelic rock with pop and electronic influences, releasing critically acclaimed albums like 'Currents'..."
    },
    similar: ["Pond", "MGMT", "King Gizzard & the Lizard Wizard"],
    date: "2025-06-22T14:00:00Z"
  },
  {
    name: "Yeah Yeah Yeahs",
    mbid: "mbid-yyy-004",
    image: [
      { link: "https://lastfm.freetls.fastly.net/i/u/300x300/3ffcb367c446426a8f43c6f9f2f77c97.png", size: "small" },
      { link: "https://example.com/yyy-medium.jpg", size: "medium" },
      { link: "https://example.com/yyy-large.jpg", size: "large" }
    ],
    ontour: false,
    stats: {
      listeners: 1567890,
      playcount: 5678901
    },
    
    bio: {
      link: "https://www.last.fm/music/Yeah+Yeah+Yeahs/+wiki",
      summary: "Yeah Yeah Yeahs are an American indie rock band...",
      content: "Led by Karen O, Yeah Yeah Yeahs gained acclaim with raw, energetic albums like 'Fever to Tell' and 'Show Your Bones'..."
    },
    similar: ["Metric", "The Kills", "Karen O"],
    date: "2025-06-22T14:00:00Z"
  },
  {
    name: "Interpol",
    mbid: "mbid-interpol-005",
    image: [
      { link: "https://lastfm.freetls.fastly.net/i/u/300x300/205e0b71f83b4e9eb15a06a84c74e0a5.png", size: "small" },
      { link: "https://example.com/interpol-medium.jpg", size: "medium" },
      { link: "https://example.com/interpol-large.jpg", size: "large" }
    ],
    ontour: false,
    stats: {
      listeners: 2012345,
      playcount: 6123456
    },
    bio: {
      link: "https://www.last.fm/music/Interpol/+wiki",
      summary: "Interpol is a post-punk revival band from New York City...",
      content: "Known for dark lyrics and melodic tension, Interpol's sound echoes Joy Division, and their debut album 'Turn on the Bright Lights' is considered a classic..."
    },
    similar: ["Editors", "White Lies", "The National"],
    date: "2025-06-22T14:00:00Z"
  }
];

const artist = dummyLastFMArtistData[0]


export function ArtistCard({
    selectedArtist,
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
             <h2 className="text-md font-semibold">{selectedArtist.name}</h2>
             {/* <h3 className="text-sm"> {formatNumber(artist.stats.listeners)} listeners
             </h3> */}
         </div>
                 <div className="
                 flex flex-col
                 text-sm text-muted-foreground
                 ">
                     <p className=''>Founded {artist?.date ? formatDate(artist.date) : 'Unknown'} </p>
                     {/* <p>{artist?.bio?.content}</p> */}
                 <p>
                     Similar to {artist?.similar?.slice(0, 3).map((name) => (
                         <button key={name}>{name}</button>
                     ))}
                 </p>
                 </div>
         </div>
             </motion.div>
     </AnimatePresence>
    )
}