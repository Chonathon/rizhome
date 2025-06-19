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
];

const genreCount = 20341; // Example count


export function ListViewPanel(){
  return (

    <div className="
    w-72 
    p-1
    flex flex-col
    max-h-[calc(100vh-80px)]
    overflow-y-auto 
    bg-white border-r 
    border-gray-200 
    shadow-md z-40 
    rounded-xl
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
          gap-1px">
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
      </div>
  );
}
