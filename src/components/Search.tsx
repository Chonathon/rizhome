import * as React from "react"
import { dummyLastFMArtistData, dummyGenres } from "@/DummyDataForDummies"
import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useRecentSelections } from "@/hooks/useRecentSelections"
import { X, Search as SearchIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"


export function Search({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const { recentSelections, addRecentSelection, removeRecentSelection } = useRecentSelections()

  const allSearchableItems = React.useMemo(() => {
    const genres = dummyGenres.map(genre => ({ id: genre.id, name: genre.name, type: 'genre' as const }));
    const artists = dummyLastFMArtistData.map(artist => ({ id: artist.mbid, name: artist.name, type: 'artist' as const }));
    return [...genres, ...artists];
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <motion.div
      layout
      >
        <Button
          variant="outline"
          className={cn(
            "w- h-[54px] bg-gray-100/90 hover:bg-gray-200/90 backdrop-blur-xs shadow-md rounded-full justify-between text-left text-md font-normal text-muted-foreground",
            className
          )}
          onClick={() => setOpen(true)}
        >
          <div className="flex gap-1 items-center">
            <SearchIcon size={20}></SearchIcon>
            {/* <span>Search...</span> */}
          </div>
          <Badge
          className="text-xs text-muted-foreground"
          variant="outline"
          >⌘K
          </Badge>
        </Button>
      </motion.div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." value={inputValue} onValueChange={setInputValue} />
        <CommandList>
          <CommandEmpty>{inputValue ? "No results found." : "Start typing to search..."}</CommandEmpty>
          {recentSelections.length > 0 && (
            <CommandGroup heading="Recent Selections">
              {recentSelections.map((selection) => (
                <CommandItem
                  key={selection.id}
                  onSelect={() => {
                    setOpen(false);
                    // Handle selection, e.g., navigate or display details
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
              {allSearchableItems.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    addRecentSelection({ id: item.id, name: item.name, type: item.type });
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <Badge variant="secondary">{item.type}</Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}