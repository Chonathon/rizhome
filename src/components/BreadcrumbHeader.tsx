import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { BasicNode } from '@/types'
import { Button } from "@/components/ui/button"
import useGenres from "@/hooks/useGenres";
import { useState } from 'react'

interface BreadcrumbHeaderProps {
    selectedGenre: string | undefined
    setSelectedGenre: (genre: string | undefined) => void
    selectedArtist: BasicNode | undefined
    setSelectedArtist: (artist: BasicNode | undefined) => void
    HomeIcon: LucideIcon
    toggleListView: () => void
    showListView: boolean
}

export function BreadcrumbHeader({
    selectedGenre,
    setSelectedGenre,
    selectedArtist,
    setSelectedArtist,
    HomeIcon,
    toggleListView,
    showListView
}: BreadcrumbHeaderProps) {
    const { genres, genreLinks, genresLoading, genresError } = useGenres();
    return (
        <div>

                <div
                className='
                    inline-flex items-center gap-2
                    px-2 py-3
                    bg-white border border-gray-200 shadow-md rounded-full
                    transition-all
                    '
                >
                    <Breadcrumb
                    className="
                    
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
                    <Button
                    variant="secondary"
                    size="sm"
                    className='rounded-full'
                    onClick={toggleListView}>
                        
                        {showListView ? <ChevronDown /> : <ChevronUp />}
                    </Button>
                </div>
        </div>
    )
}