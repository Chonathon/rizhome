import {Genre, NodeLink} from "@/types";
import React, {useEffect, useState, useRef, useMemo} from "react";
import ForceGraph, {ForceGraphMethods, GraphData, NodeObject} from "react-force-graph-2d";
import {Loading} from "./Loading";
import {forceCollide} from 'd3-force';

// Needs more props like the view/filtering controls
interface GenresForceGraphProps {
    genres: Genre[];
    links: NodeLink[];
    onNodeClick: (genreName: string) => void;
    loading: boolean;
    show: boolean;
}

const GenresForceGraph: React.FC<GenresForceGraphProps> = ({ genres, links, onNodeClick, loading, show }) => {
    const [graphData, setGraphData] = useState<GraphData<Genre, NodeLink>>({ nodes: [], links: [] });
    const fgRef = useRef<ForceGraphMethods<Genre, NodeLink> | undefined>(undefined);

    useEffect(() => {
        if (genres) {
            setGraphData({ nodes: genres, links });
            if (fgRef.current) {
                fgRef.current.d3Force('charge')?.strength(-500);
                fgRef.current.d3Force('link')?.distance(100);
                // @ts-expect-error this works
                const labelPadding = 24;
                fgRef.current.d3Force('collide', forceCollide((node: Genre) => calculateRadius(node.artistCount) + labelPadding));
                fgRef.current.zoom(0.15);
                fgRef.current.centerAt(-400, -800, 0);
            }
        }
    }, [genres, links, show]);

    const calculateRadius = (artistCount: number) => {
        return 5 + Math.sqrt(artistCount) * 3.2;
    };

    const nodeCanvasObject = (node: NodeObject, ctx: CanvasRenderingContext2D) => {
        const genreNode = node as Genre;
        const radius = calculateRadius(genreNode.artistCount);
        const fontSize = 10;
        const nodeX = node.x || 0;
        const nodeY = node.y || 0;

        // Node styling
        ctx.fillStyle = 'rgba(138, 128, 255, 0.4)'; // Semi-transparent fill
        ctx.strokeStyle = 'rgba(138, 128, 255, 0.8)'; // Border color
        ctx.lineWidth = 0.5;

        // Draw node
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        // Text styling
        ctx.font = `${fontSize}px Geist`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Slightly transparent white
        ctx.fillText(genreNode.name, nodeX, nodeY + radius + fontSize);
    };

    const nodePointerAreaPaint = (node: NodeObject, color: string, ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = color;
        const genreNode = node as Genre;
        const radius = calculateRadius(genreNode.artistCount);
        const nodeX = node.x || 0;
        const nodeY = node.y || 0;

        ctx.beginPath();
        ctx.arc(nodeX, nodeY, radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    return !show ? null : loading ? <Loading /> : (
        <ForceGraph
            ref={fgRef}
            graphData={graphData}
            linkCurvature={0.3}
            linkColor={() => 'rgba(255, 255, 255, 0.1)'}
            linkWidth={0.5}
            onNodeClick={node => onNodeClick(node.name)}
            nodeCanvasObject={nodeCanvasObject}
            nodeCanvasObjectMode={() => 'replace'}
            nodeVal={(node: Genre) => calculateRadius(node.artistCount)}
            nodePointerAreaPaint={nodePointerAreaPaint}
        />
    )
}

export default GenresForceGraph;