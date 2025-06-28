import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react'
import {Artist, BasicNode, GraphType} from '@/types'
import { Button } from "@/components/ui/button"
import useGenres from "@/hooks/useGenres";

interface BreadcrumbHeaderProps {
    selectedGenre: string | undefined;
    selectedArtist: Artist | undefined;
    HomeIcon: LucideIcon;
    toggleListView: () => void;
    showListView: boolean;
    reset: () => void;
    hideArtistCard: () => void;
}

export function BreadcrumbHeader({
    selectedGenre,
    selectedArtist,
    HomeIcon,
    toggleListView,
    showListView,
    reset,
    hideArtistCard
}: BreadcrumbHeaderProps) {

    return (
        <div>
            <div
                className='
                    h-[54px]
                    inline-flex items-center gap-2
                    px-2 py-3
                    bg-gray-50/90 border backdrop-blur-xs border-gray-200 shadow-md rounded-full
                    transition-all
                    '
                >
                    <Breadcrumb
                    className="
                    
                    ">
                        <BreadcrumbList>
                            {/* Home icon - always visible */}
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => reset()}>
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
                                            <BreadcrumbLink onClick={() => hideArtistCard()}>
                                                {selectedGenre}
                                            </BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage>{selectedGenre}</BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                </>
                            )}
                            {/* Show selected artist if available */}
                            {/* {selectedGenre && selectedArtist && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{selectedArtist.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )} */}
                        </BreadcrumbList>
                    </Breadcrumb>
                    {/* show to have access to ListViewPanel */}
                    {/*<Button*/}
                    {/*variant="secondary"*/}
                    {/*size="sm"*/}
                    {/*className='rounded-full'*/}
                    {/*onClick={toggleListView}>*/}
                    {/*    {showListView ? <ChevronUp /> : <ChevronDown />}*/}
                    {/*</Button>*/}
            </div>
        </div>
    )
}