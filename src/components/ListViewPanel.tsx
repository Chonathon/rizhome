import React from 'react';
import { BasicNode } from '@/types';
import {Genre, NodeLink} from "@/types";
import { Button } from '@/components/ui/button';
import { ArrowUpNarrowWide } from "lucide-react"
import { useState } from 'react';

interface ListViewPanelProps {
  genres: Genre[];
  selectedGenre: string | undefined
  selectedArtist: BasicNode | undefined 
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


const dummyGenres = [
  { id: '1', name: 'Indie Rock', origin: 'USA', year: 1980, emoji: '🎸', artistCount: 321 },
  { id: '2', name: 'Synth Pop', origin: 'UK', year: 1979, emoji: '🎹', artistCount: 204 },
  { id: '3', name: 'Alternative Metal', origin: 'USA', year: 1985, emoji: '🤘', artistCount: 158 },
  { id: '4', name: 'Neo-Soul', origin: 'USA', year: 1990, emoji: '🎤', artistCount: 97 },
  { id: '5', name: 'Lo-fi Beats', origin: 'Global', year: 2000, emoji: '🎧', artistCount: 512 },
  { id: '6', name: 'Ambient Drone', origin: 'Global', year: 1970, emoji: '🎶', artistCount: 76 },
  { id: '7', name: 'Post-Punk Revival', origin: 'UK', year: 2000, emoji: '🖤', artistCount: 134 },
  { id: '8', name: 'Experimental Hip Hop', origin: 'USA', year: 1995, emoji: '🎤', artistCount: 89 },
  { id: '9', name: 'Jazz Fusion', origin: 'USA', year: 1960, emoji: '🎷', artistCount: 186 },
  { id: '10', name: 'Electro Swing', origin: 'Europe', year: 2000, emoji: '💃', artistCount: 41 },
  { id: '11', name: 'Chillwave', origin: 'USA', year: 2009, emoji: '🌊', artistCount: 112 },
  { id: '12', name: 'Vaporwave', origin: 'Internet', year: 2010, emoji: '🌀', artistCount: 78 },
  { id: '13', name: 'Krautrock', origin: 'Germany', year: 1970, emoji: '🇩🇪', artistCount: 66 },
  { id: '14', name: 'Afrobeats', origin: 'Nigeria', year: 2000, emoji: '🥁', artistCount: 132 },
  { id: '15', name: 'Cumbia', origin: 'Colombia', year: 1950, emoji: '🎺', artistCount: 88 },
  { id: '16', name: 'Reggaeton', origin: 'Puerto Rico', year: 1990, emoji: '🔥', artistCount: 143 },
  { id: '17', name: 'Drum and Bass', origin: 'UK', year: 1993, emoji: '🥁', artistCount: 109 },
  { id: '18', name: 'Grime', origin: 'UK', year: 2003, emoji: '🎤', artistCount: 97 },
  { id: '19', name: 'Trap', origin: 'USA', year: 2000, emoji: '💣', artistCount: 223 },
  { id: '20', name: 'Hardstyle', origin: 'Netherlands', year: 2002, emoji: '🔊', artistCount: 64 },
  { id: '21', name: 'Bluegrass', origin: 'USA', year: 1940, emoji: '🪕', artistCount: 51 },
  { id: '22', name: 'Math Rock', origin: 'USA', year: 1985, emoji: '📐', artistCount: 74 },
  { id: '23', name: 'Folk Punk', origin: 'USA', year: 1990, emoji: '🍻', artistCount: 49 },
  { id: '24', name: 'Electroclash', origin: 'Germany', year: 1997, emoji: '⚡️', artistCount: 39 },
  { id: '25', name: 'Future Bass', origin: 'Global', year: 2010, emoji: '🎛️', artistCount: 104 },
  { id: '26', name: 'Chiptune', origin: 'Japan', year: 1980, emoji: '🕹️', artistCount: 61 },
  { id: '27', name: 'Noise Rock', origin: 'USA', year: 1981, emoji: '🔊', artistCount: 73 },
  { id: '28', name: 'Space Disco', origin: 'Italy', year: 1977, emoji: '🚀', artistCount: 45 },
  { id: '29', name: 'Italo Disco', origin: 'Italy', year: 1980, emoji: '💽', artistCount: 87 },
  { id: '30', name: 'Shoegaze', origin: 'UK', year: 1988, emoji: '👟', artistCount: 102 },
  { id: '31', name: 'Psytrance', origin: 'India', year: 1995, emoji: '🧠', artistCount: 58 },
  { id: '32', name: 'Sludge Metal', origin: 'USA', year: 1990, emoji: '🛢️', artistCount: 44 },
  { id: '33', name: 'Dub', origin: 'Jamaica', year: 1968, emoji: '🌴', artistCount: 91 },
  { id: '34', name: 'K-Pop', origin: 'South Korea', year: 1992, emoji: '🇰🇷', artistCount: 310 },
  { id: '35', name: 'J-Pop', origin: 'Japan', year: 1980, emoji: '🎎', artistCount: 189 },
  { id: '36', name: 'Zydeco', origin: 'USA', year: 1940, emoji: '🪗', artistCount: 33 },
  { id: '37', name: 'Moombahton', origin: 'USA', year: 2009, emoji: '💃', artistCount: 42 },
  { id: '38', name: 'Dream Pop', origin: 'UK', year: 1985, emoji: '💤', artistCount: 84 },
  { id: '39', name: 'Bossa Nova', origin: 'Brazil', year: 1950, emoji: '🌺', artistCount: 67 },
  { id: '40', name: 'Twee Pop', origin: 'UK', year: 1986, emoji: '🍭', artistCount: 29 },
  { id: '41', name: 'Gqom', origin: 'South Africa', year: 2010, emoji: '🌍', artistCount: 48 },
  { id: '42', name: 'Enka', origin: 'Japan', year: 1950, emoji: '🎙️', artistCount: 35 },
  { id: '43', name: 'Hi-NRG', origin: 'USA', year: 1980, emoji: '⚡', artistCount: 51 },
  { id: '44', name: 'Eurobeat', origin: 'Europe', year: 1986, emoji: '🏎️', artistCount: 38 },
  { id: '45', name: 'Crunk', origin: 'USA', year: 1990, emoji: '🥂', artistCount: 77 },
  { id: '46', name: 'Cloud Rap', origin: 'USA', year: 2008, emoji: '☁️', artistCount: 65 },
  { id: '47', name: 'Wonky', origin: 'UK', year: 2008, emoji: '🎛️', artistCount: 26 },
  { id: '48', name: 'G-Funk', origin: 'USA', year: 1992, emoji: '🚗', artistCount: 92 },
  { id: '49', name: 'New Jack Swing', origin: 'USA', year: 1987, emoji: '🕺', artistCount: 71 },
  { id: '50', name: 'Neo-Classical', origin: 'Europe', year: 2000, emoji: '🎻', artistCount: 58 },
];

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
// placeholder for genre count
const genreCount = "20,341"; // Example count

// placeholder for emoji
const emojiPool = ["🎸", "🎧", "🎷", "🥁", "🎤", "🎹", "🎻", "🪕", "📻", "🎶", "💿", "🕺", "👟", "💥", "☁️", "🌀"];
function getRandomEmoji() {
  return emojiPool[Math.floor(Math.random() * emojiPool.length)];
}

export function ListViewPanel({ 
  genres,
  selectedGenre,
  selectedArtist
}: ListViewPanelProps) {
  console.log("Example artist data:", dummyLastFMArtistData[0]);
  

  return (

    <div className="
    w-[320px] 
    flex flex-col
    h-[calc(100vh-104px)]
    bg-white border border-gray-200 shadow-md rounded-3xl
    overflow-hidden
    ">
      {/* list controls */}
      <div 
      className='
      flex 
      items-center 
      justify-between
      pl-4
      pr-2
      pt-3
      '>
        <span className="text-muted-foreground text-sm font-normal">{genreCount} Genres</span>
        <Button
          variant="ghost"
          size="sm"
        >
          <ArrowUpNarrowWide /> Sort
          </Button>
      </div>
        {/* List */}

        {(!selectedGenre && !selectedArtist) && (
          <ul
            className="
            flex
            flex-col
            gap-1px
            p-1
            overflow-y-auto
            no-scrollbar
            ">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="
                hover:bg-gray-100
                rounded-md
                "
              >
                {/* List item contents */}
                <button 
                  className="w-full text-left">
                  <div
                    className='
                    flex
                    items-start
                    py-1 px-3
                    gap-2
                    '
                  >
                    <span className="text-xl">{getRandomEmoji()}</span>
                    <div className='flex flex-col items-start'>
                      <span className="text-md font-medium">{genre.name}</span>
                      <div className="text-sm text-gray-600">{genre.artistCount} · {genre.artistCount} · {genre.artistCount}</div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
        
        {(selectedGenre && (
          <ul
            className="
            flex
            flex-col
            gap-3
            p-1
            overflow-y-auto
            no-scrollbar
            ">
            {dummyLastFMArtistData.map((artist) => (
              <li
                key={artist.mbid}
              >
                {/* List item contents */}
                <button 
                  className="
                  w-full text-left
                  rounded-md
                ">
                  <div
                    className='
                    flex
                    flex-col
                    items-start
                    py-1 px-3
                    '
                  >
                      <div className="w-full aspect-[2/1] overflow-hidden rounded-md border border-gray-300">
                        <img
                          src={artist.image[0].link}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    <div className='flex flex-col items-start gap-1'>
                      <div>
                        <h2 className="text-lg font-semibold">{artist.name}</h2>
                        <h3 className="text-md"> {formatNumber(artist.stats.listeners)} listeners
                        </h3>
                      </div>
                        {/* <div>
                          <div className="text-sm text-foreground">
                            <span className='font-medium text-foreground'>Founded:</span> {formatDate(artist.date)}
                          </div>
                          <div className="text-sm text-foreground"><span className='font-medium text-foreground'>Similar artists:</span> {artist.similar[0]}, {artist.similar[1]}, {artist.similar[1]}</div>
                        </div> */}
                      </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ))}
        {/* overflow gradient */}
        {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" /> */}
      </div>
  );
}
