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
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                // ctx.fillStyle = 'black';
                // ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node.color;
                ctx.fillText(label, node.x || 0, node.y || 0);

                node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
            }}
            // nodePointerAreaPaint={(node, color, ctx) => {
            //     ctx.fillStyle = color;
            //     const bckgDimensions = node.__bckgDimensions;
            //     bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            // }}
        />)
    )
}

export default ArtistsForceGraph;