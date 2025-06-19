import {Genre} from "@/types";
import React, {useEffect, useState, useRef} from "react";
import ForceGraph, {GraphData} from "react-force-graph-2d";
import {Loading} from "./Loading";

// Needs more props like the view/filtering controls
interface GenresForceGraphProps {
    genres: Genre[];
    onNodeClick: (genreName: string) => void;
    loading: boolean;
    setVisibleGenres: (genres: Genre[]) => void;
}

const GenresForceGraph: React.FC<GenresForceGraphProps> = ({ genres, onNodeClick, loading, setVisibleGenres }) => {
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const fgRef = useRef<any>(null);

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

                // Draw label below node
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'blue';
                ctx.fillText(label, x, y + radius + labelOffset);
                
                

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