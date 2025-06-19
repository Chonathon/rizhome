import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { LucideIcon } from 'lucide-react'
import { BasicNode } from '@/types'
import { ListViewPanel } from "@/components/ListViewPanel"

interface BreadcrumbHeaderProps {
    selectedGenre: string | undefined
    setSelectedGenre: (genre: string | undefined) => void
    selectedArtist: BasicNode | undefined
    setSelectedArtist: (artist: BasicNode | undefined) => void
    HomeIcon: LucideIcon
}

export function BreadcrumbHeader({
            selectedGenre,
            setSelectedGenre,
            selectedArtist,
            setSelectedArtist,
            HomeIcon
        }: BreadcrumbHeaderProps) {
    return (
        <div 
        className="
        fixed top-4 left-4 z-50
        
        ">
            <div 
            className="
            inline-flex flex-col gap-2 items-start
            ">
                <Breadcrumb 
                className="
                inline-flex items-center
                px-2 py-3
                bg-white border border-gray-200 shadow-md rounded-xl
                transition-all
                ">
                    <BreadcrumbList>
                        {/* Home icon - always visible */}
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => {
                                setSelectedGenre(undefined)
                                setSelectedArtist(undefined)
                            } }>
                                <HomeIcon size={20} />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* Show selected genre if available */}
                        {selectedGenre && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {selectedArtist ? (
                                        // Clickable link that sets selectedArtist to undefined
                                        <BreadcrumbLink onClick={() => {
                                            setSelectedArtist(undefined)
                                            // TODO: Add logic to reset graph view to genre level
                                        } }>
                                            {selectedGenre}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{selectedGenre}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                            </>
                        )}
                        {/* Show selected artist if available */}
                        {selectedGenre && selectedArtist && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{selectedArtist.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
                <ListViewPanel />
            </div>
        </div>
    )
}