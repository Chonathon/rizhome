import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useRecentSelections } from "@/hooks/useRecentSelections"
import { X, Search as SearchIcon } from "lucide-react"
import { motion } from "framer-motion";
import {isGenre} from "@/lib/utils"
import {BasicNode, GraphType} from "@/types";
import {useEffect, useState} from "react";
import { useMemo } from "react";

interface SearchProps {
  onGenreSelect: (genre: string) => void;
  onArtistSelect: (artistName: string) => void;
  setQuery: (query: string) => void;
  searchableItems: BasicNode[];
  graphState: GraphType;
}

const DEBOUNCE_MS = 500;

export function Search({ onGenreSelect, onArtistSelect, setQuery, searchableItems, graphState }: SearchProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const { recentSelections, addRecentSelection, removeRecentSelection } = useRecentSelections()

  // Debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(inputValue);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [inputValue, DEBOUNCE_MS]);

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

  const filteredSearchableItems = useMemo(() =>
          searchableItems.filter((item) =>
              item.name.toLowerCase().includes(inputValue.toLowerCase())
          ),
      [searchableItems, inputValue]
  );

  const onItemSelect = (selection: BasicNode) => {
    if (isGenre(selection)) {
      onGenreSelect(selection.name);
    } else {
      onArtistSelect(selection.name);
    }
    addRecentSelection(selection);
    setOpen(false);
  }

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
          key={searchableItems.length ? searchableItems[searchableItems.length - 1].name : searchableItems.length}
          open={open}
          onOpenChange={setOpen}
      >
        <CommandInput
            placeholder="Search..."
            value={inputValue}
            onValueChange={setInputValue}
            onFocus={(e) => {
              e.target.setSelectionRange(inputValue.length, inputValue.length);
            }}
        />
        <CommandList>
          <CommandEmpty>{inputValue ? "No results found." : "Start typing to search..."}</CommandEmpty>
          {recentSelections.length > 0 && (
            <CommandGroup heading="Recent Selections">
              {recentSelections.map((selection) => (
                <CommandItem
                  key={selection.id}
                  onSelect={() => onItemSelect(selection)}
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
                {filteredSearchableItems.map((item, i) => (
                    <CommandItem
                        key={`${item.id}-${i}`}  // Updated key to ensure uniqueness
                        onSelect={() => onItemSelect(item)}
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