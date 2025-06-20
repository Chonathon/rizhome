import {Genre, NodeLink} from "@/types";
import React, {useEffect, useState} from "react";
import ForceGraph, {GraphData} from "react-force-graph-2d";
import {Loading} from "./Loading";

// Needs more props like the view/filtering controls
interface GenresForceGraphProps {
    genres: Genre[];
    links: NodeLink[];
    onNodeClick: (genreName: string) => void;
    loading: boolean;
}

const GENRE_MAX_SIZE = 34000; // Approx. size of the largest genre (rock)
const TRANSPARENCY = 0.666;

const GenresForceGraph: React.FC<GenresForceGraphProps> = ({ genres, links, onNodeClick, loading }) => {
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });

    useEffect(() => {
        if (genres && links){
            setGraphData({ nodes: genres, links })
        }
    }, [genres]);

    return loading ? <Loading /> : (
        <ForceGraph
            graphData={graphData}
            linkVisibility={true}
            linkColor='#666666'
            linkCurvature={0.2}
            nodeRelSize={2} // dunno what this does
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
            // I think this draws the interactable area of the node
            nodePointerAreaPaint={(node, color, ctx) => {
                ctx.fillStyle = color;
                const bckgDimensions = node.__bckgDimensions;
                // @ts-ignore
                bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            }}
        />
    )
}

export default GenresForceGraph;