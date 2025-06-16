import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { LucideIcon } from 'lucide-react'
import { BasicNode } from '@/types'

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
        <Breadcrumb className="fixed top-4 left-4 z-50 p-2 rounded-xl overflow-hidden">
            <BreadcrumbList>
                {/* Home icon - always visible */}
                <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => {
                        setSelectedGenre(undefined)
                        setSelectedArtist(undefined)
                    }}>
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
                                }}>
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
    )
}