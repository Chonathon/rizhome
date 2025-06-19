import React from 'react';
import { BasicNode } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUpNarrowWide } from "lucide-react"

interface ListViewPanelProps {
  // nodes: BasicNode[];
}


const dummyVisibleNodes = [
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

const genreCount = "20,341"; // Example count


export function ListViewPanel(){
  return (

    <div className="
    w-full 
    min-w-[420px]
    flex flex-col
    h-[calc(100vh-96px)]
    bg-white border border-gray-200 shadow-md rounded-xl
    overflow-hidden
    ">
      {/* list controls */}
      <div 
      className='
      flex 
      items-center 
      justify-between
      pl-3
      pr-2
      py-1
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
        <ul
          className="
          flex
          flex-col
          gap-1px
          p-1
          overflow-y-auto
          no-scrollbar
          ">
          {dummyVisibleNodes.map((node) => (
            // List item
            <button>
              <li key={node.id}
              className="
              hover:bg-gray-100
              rounded-md
              
              ">
                {/* List item contents */}
                  <div
                  className='
                  flex
                  items-start
                  py-1 px-3
                  gap-2
                  '>
              
                    <span className="text-xl">{node.emoji}</span>
                    <div className='flex flex-col items-start'>
                      <span className="text-md font-medium">{node.name}</span>
                      <div className="text-sm text-gray-600">{node.origin} - {node.year} - {node.artistCount}</div>
                    </div>
                  </div>
              </li>
            </button>
          ))}
        </ul>
        
        {/* overflow gradient */}
        {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" /> */}
      </div>
  );
}
