import * as React from "react"
import { dummyLastFMArtistData } from "@/DummyDataForDummies"
import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useRecentSelections } from "@/hooks/useRecentSelections"
import { X, Search as SearchIcon } from "lucide-react"
import { motion } from "framer-motion";
import {cn, isGenre} from "@/lib/utils"
import {BasicNode, Genre, LastFMSearchArtistData} from "@/types";
import {useEffect, useMemo, useState} from "react";

interface SearchProps {
  onGenreSelect: (genre: string) => void;
  onArtistSelect: (artistName: string) => void;
  setQuery: (query: string) => void;
  searchableItems: BasicNode[];
}

export function Search({ onGenreSelect, onArtistSelect, setQuery, searchableItems }: SearchProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const { recentSelections, addRecentSelection, removeRecentSelection } = useRecentSelections()

  // const allSearchableItems = React.useMemo(() => {
  //   const genreItems = genres.map((genre: Genre) => ({ id: genre.id, name: genre.name, type: 'genre' as const }));
  //   const artists = searchResults.map(artist => ({ id: artist.mbid, name: artist.name, type: 'artist' as const }));
  //   return [...genreItems, ...artists];
  // }, [genres, searchResults]);

  // Debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(inputValue);
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputValue, 500]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // function handleSelection(item: { type: string; name: string; id: any }) {
  //   if (item.type === 'genre') {
  //       onGenreSelect(item.name);
  //     } else {
  //       onArtistSelect(item.name);
  //     }
  //     addRecentSelection({ id: item.id, name: item.name, type: item.type });
  //     setOpen(false);
  // }

  return (
    <>
      <motion.div
      layout
      >
        <Button
          variant="outline"
          aria-label="Search"
          className=
            "w- h-[54px] bg-gray-100/90 hover:bg-gray-200/90 backdrop-blur-xs shadow-md rounded-full justify-between text-left text-md font-normal text-muted-foreground"
          
          onClick={() => setOpen(true)}
        >
          <div className="flex gap-2 items-center">
            <SearchIcon size={20}></SearchIcon>
            <span className="text-sm text-muted-foreground">⌘K</span>
          </div>
          {/* <Badge
          className="text-xs text-muted-foreground"
          variant="outline"
          >⌘K
          </Badge> */}
        </Button>
      </motion.div>
      <CommandDialog
          key={searchableItems.length}
          open={open}
          onOpenChange={setOpen}
      >
        <CommandInput placeholder="Search..." value={inputValue} onValueChange={setInputValue} />
        <CommandList>
          <CommandEmpty>{inputValue ? "No results found." : "Start typing to search..."}</CommandEmpty>
          {recentSelections.length > 0 && (
            <CommandGroup heading="Recent Selections">
              {recentSelections.map((selection) => (
                <CommandItem
                  key={selection.id}
                  onSelect={() => {
                    if (isGenre(selection)) {
                      onGenreSelect(selection.name);
                    } else {
                      onArtistSelect(selection.name);
                    }
                    addRecentSelection(selection);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <span>{selection.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent CommandItem onSelect from firing
                      removeRecentSelection(selection.id);
                    }}
                    className="h-auto p-1"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {recentSelections.length > 0 && <CommandSeparator />}
          {inputValue && (
            <CommandGroup heading="All Results">
              {searchableItems.map((item, i) => (
                <CommandItem
                  key={item.id + i}
                  onSelect={() => {
                    if (isGenre(item)) {
                      onGenreSelect(item.name);
                    } else {
                      onArtistSelect(item.name);
                    }
                    addRecentSelection(item);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <Badge variant="secondary">{isGenre(item) ? 'genre' : 'artist'}</Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}