import {Artist, ArtistLink, BasicNode} from "@/types";
import React, {useEffect, useState} from "react";
import ForceGraph, {GraphData} from "react-force-graph-2d";
import { Loading} from "./Loading";

// Needs more props like the view/filtering controls
interface ArtistsForceGraphProps {
    artists: Artist[];
    artistLinks: ArtistLink[];
    onNodeClick: (artist: BasicNode) => void;
    loading: boolean;
}

const ArtistsForceGraph: React.FC<ArtistsForceGraphProps> = ({artists, artistLinks, onNodeClick, loading}) => {
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    useEffect(() => {
        if (artists && artistLinks) {
            setGraphData(
                {
                    nodes: artists.map(artist => {
                        return {id: artist.id, name: artist.name}
                    }),
                    links: artistLinks.map(link => {
                        return {source: link[0], target: link[1]}
                    }),
                }
            );
        }

    }, [artists, artistLinks]);

    return loading ? (<div className="flex-1 h-[calc(100vh-104px)] w-full bg-gray-100">
        <Loading />
    </div>) : (
        (<ForceGraph
            graphData={graphData}
            linkVisibility={true}
            linkColor='#666666'
            linkCurvature={0.2}
            onNodeClick={node => onNodeClick({ id: node.id ? node.id.toString() : 'no id', name: node.name })}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12/globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node.color;
                ctx.fillText(label, node.x || 0, node.y || 0);

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
        />)
    )
}

export default ArtistsForceGraph;