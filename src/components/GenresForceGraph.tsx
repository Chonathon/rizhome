import {Genre, GenreArtistCountMap} from "@/types";
import React, {useEffect, useState, useRef} from "react";
import ForceGraph, {GraphData} from "react-force-graph-2d";
import {Loading} from "./Loading";

// Needs more props like the view/filtering controls
interface GenresForceGraphProps {
    genres: Genre[];
    genreArtistCounts: GenreArtistCountMap;
    onNodeClick: (genreName: string) => void;
    loading: boolean;
    setVisibleGenres: (genres: Genre[]) => void;
}

const FILTER_THRESHOLD = 0; // Filters out genres with this amount of artists
const GENRE_MAX_SIZE = 34000; // Approx. size of the largest genre (rock)
const TRANSPARENCY = 0.666;

const GenresForceGraph: React.FC<GenresForceGraphProps> = ({ genres, genreArtistCounts, onNodeClick, loading }) => {
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const fgRef = useRef<any>(null);

    useEffect(() => {
        if (genres && genreArtistCounts){

            // TODO: should prob do this on the server
            // This filters out empty genres and links ones that contain the whole name of another genre
            const nodes: {id: string, name: string, artistCount: number}[] = [];
            const links: {source: string, target: string}[] = [];
            const linkKeys = new Set(); // for deduplication

            const genreNames = new Map(); // lowercased genre name → genre ID

            genres
                .filter(g => genreArtistCounts[g.id] > FILTER_THRESHOLD)
                .forEach(genre => {
                    const lowerName = genre.name.toLowerCase();
                    genreNames.set(lowerName, genre.id);
                });

            genres
                .filter(g => genreArtistCounts[g.id] > FILTER_THRESHOLD)
                .forEach(genre => {
                    const { id, name } = genre;
                    const lowerName = name.toLowerCase();

                    nodes.push({ id, name, artistCount: genreArtistCounts[id] });

                    for (const [otherName, otherId] of genreNames.entries()) {
                        if (otherName === lowerName) continue;

                        // Check if `otherName` exists as a standalone phrase in `lowerName`
                        const regex = new RegExp(`(^|[\\s&-])${escapeRegex(otherName)}($|[\\s&-])`, 'i');
                        if (regex.test(lowerName)) {
                            const [a, b] = [id, otherId].sort(); // undirected
                            const key = `${a}:${b}`;
                            if (!linkKeys.has(key)) {
                                linkKeys.add(key);
                                links.push({ source: a, target: b });
                            }
                        }
                    }
                });

            // Helper to escape special regex chars
            function escapeRegex(s: string) {
                return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            setGraphData({ nodes, links });
        }
    }, [genres]);

    // useEffect(() => {
    //     const updateVisibleGenres = () => {
    //         if (!fgRef.current) return;

    //         const fg = fgRef.current;
    //         const allNodes = fg.graphData().nodes;
    //         const { x: cx, y: cy, k: zoom } = fg.cameraPosition();
    //         const halfWidth = window.innerWidth / 2 / zoom;
    //         const halfHeight = window.innerHeight / 2 / zoom;

    //         const visible = allNodes.filter((node: any) => {
    //             const nx = node.x || 0;
    //             const ny = node.y || 0;
    //             return (
    //                 nx > cx - halfWidth &&
    //                 nx < cx + halfWidth &&
    //                 ny > cy - halfHeight &&
    //                 ny < cy + halfHeight
    //             );
    //         });

    //         // setVisibleGenres(visible.map(node => ({ id: node.id, name: node.name })));
    //     };

    //     updateVisibleGenres();
    //     const fg = fgRef.current;
    //     fg && fg.onZoom(updateVisibleGenres) && fg.onPan(updateVisibleGenres);
    // }, [graphData, setVisibleGenres]);

    return loading ? <Loading /> : (
        
        <ForceGraph
            ref={fgRef}
            graphData={graphData}
            linkVisibility={true}
            linkColor='#666666'
            linkCurvature={0.2}
            nodeVisibility={true}
            onNodeClick={node => onNodeClick(node.name)}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const sizeRatio = node.artistCount / GENRE_MAX_SIZE;
                const label = node.name;
                const fontSize = node.artistCount / 120 + 10; // quick & dirty relative text size
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                const x = node.x || 0;
                const y = node.y || 0;
                const radius =  node.artistCount / 70 + 10; // size of the node
                const labelOffset = 10;

                // Draw node circle
                ctx.beginPath();    
                ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

                // The coloring, these are just so they stand out, could be better colors
                ctx.fillStyle = `rgba(${sizeRatio * 255}, ${Math.abs(127 - (sizeRatio * 255))}, ${255 - (sizeRatio * 255)}, ${TRANSPARENCY})` || 'blue';
                ctx.fill();

                // Draw label
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'white';
                ctx.font = `${fontSize}px Sans-Serif`;
                ctx.fillText(label, x, y - 6, radius * 2);

                node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
            }}
                  nodePointerAreaPaint={(node, color, ctx, globalScale) => {
                ctx.fillStyle = color;
                const [width = 0, height = 0] = node.__bckgDimensions || [0, 0];
                const minSize = 24/globalScale; // minimum touch size in pixels
                const w = Math.max(width, minSize);
                const h = Math.max(height, minSize);
                const x = (node.x || 0) - w / 2;
                const y = (node.y || 0) - h / 2;
                ctx.fillRect(x, y, w, h);
                }}
        />
    )
}

export default GenresForceGraph;