import * as React from "react"
import { dummyLastFMArtistData, dummyGenres } from "@/DummyDataForDummies"
import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
// import { Badge } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Search() {
  const [open, setOpen] = React.useState(false)

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <Button
        variant="outline"
        className="w-[300px] py-7 shadow-md rounded-full justify-between text-left text-md font-normal text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <span>Search...</span>
        {/* <span>⌘ + K</span> */}
        <Badge
        className="text-xs text-muted-foreground"
        variant="outline"
        >⌘K
        </Badge>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Genres">
            {dummyGenres.map((genre) => (
              <CommandItem key={genre.id} onSelect={() => setOpen(false)}>{genre.name}</CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Artists">
            {dummyLastFMArtistData.map((artist) => (
              <CommandItem key={artist.mbid} onSelect={() => setOpen(false)}>{artist.name}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}