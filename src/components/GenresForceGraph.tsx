import {Genre} from "@/types";
import React, {useEffect, useState} from "react";
import ForceGraph, {GraphData} from "react-force-graph-2d";

// Needs more props like the view/filtering controls
interface GenresForceGraphProps {
    genres: Genre[];
    onNodeClick: (genreName: string) => void;
}

const GenresForceGraph: React.FC<GenresForceGraphProps> = ({ genres, onNodeClick }) => {
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });

    useEffect(() => {
        if (genres){
            setGraphData({
                nodes: genres.map(genre => {
                    return {id: genre.id, name: genre.name}
                }),
                links: []
            });
        }
    }, [genres]);

    return !genres ? <p>Genres not loaded!</p> : (
        <ForceGraph
            graphData={graphData}
            linkVisibility={true}
            linkColor='#666666'
            linkCurvature={0.2}
            nodeRelSize={24}
            nodeVisibility={true}
            onNodeClick={node => onNodeClick(node.name)}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12/globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                const x = node.x || 0;
                const y = node.y || 0;
                const radius = 8;
                const labelOffset = 10;


                

                // Draw node circle
                ctx.beginPath();    
                ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.color || 'blue';
                ctx.fill();
                // Zoom logic for text opacity
                const minZoom = 0;
                const maxZoom = .7;
                const zoomRatio = Math.max(0, Math.min(1, (globalScale - minZoom) / (maxZoom - minZoom)));
                const textOpacity = zoomRatio;
                
                
                // Draw label below node
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = `rgba(0, 0, 255, ${textOpacity})`
                ctx.fillText(label, x, y + radius + labelOffset);
                
                

                node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
            }}
            // nodePointerAreaPaint={(node, color, ctx) => {
            //     ctx.fillStyle = color;
            //     const bckgDimensions = node.__bckgDimensions;
            //     bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            // }}
        />
    )
}

export default GenresForceGraph;