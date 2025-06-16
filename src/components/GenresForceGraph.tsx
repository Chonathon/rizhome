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
            onNodeClick={node => onNodeClick(node.name)}
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
        />
    )
}

export default GenresForceGraph;