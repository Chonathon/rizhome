import {Genre, NodeLink} from "@/types";
import React, {useEffect, useState, useRef} from "react";
import ForceGraph, {ForceGraphMethods, GraphData, NodeObject} from "react-force-graph-2d";
import {Loading} from "./Loading";
import {forceCollide} from 'd3-force';

// Needs more props like the view/filtering controls
interface GenresForceGraphProps {
    genres: Genre[];
    links: NodeLink[];
    onNodeClick: (genreName: string) => void;
    loading: boolean;
}

const GENRE_MAX_SIZE = 34000; // Approx. size of the largest genre (rock)
const TRANSPARENCY = 0.8;

const GenresForceGraph: React.FC<GenresForceGraphProps> = ({ genres, links, onNodeClick, loading }) => {
    const [graphData, setGraphData] = useState<GraphData<Genre, NodeLink>>({ nodes: [], links: [] });
    const fgRef = useRef<ForceGraphMethods<Genre, NodeLink> | undefined>(undefined);

    useEffect(() => {
        if (genres && links){
            setGraphData({ nodes: genres, links });
            // Creates d3 forces to separate nodes and centers/zooms to a set level on load
            if (fgRef.current) {
                fgRef.current.d3Force('charge')?.strength(-500);
                fgRef.current.d3Force('link')?.distance(100);
                // @ts-expect-error this works
                fgRef.current.d3Force('collide', forceCollide((node: Genre) => calculateRadius(node.artistCount) + 1));
                fgRef.current.zoom(0.15);
                fgRef.current.centerAt(-400, -800, 0);
            }
        }
    }, [genres]);

    const calculateRadius = (artistCount: number) => {
        return 5 + Math.sqrt(artistCount) * 2;
    };

    const getColor = (artistCount: number) => {
        const ratio = Math.min(artistCount / GENRE_MAX_SIZE, 1);
        const r = Math.floor(ratio * 255);
        const g = Math.abs(127 - (ratio * 255));
        const b = Math.floor(255 - (ratio * 255));
        return `rgba(${r}, ${g}, ${b}, ${TRANSPARENCY})`;
    };

    const nodeCanvasObject = (node: NodeObject, ctx: CanvasRenderingContext2D) => {
        const genreNode = node as Genre;
        const radius = calculateRadius(genreNode.artistCount);
        const fontSize = (radius * Math.min(4 / genreNode.name.length, 1) * 0.75); // Font size based on radius and name length
        const nodeX = node.x || 0;
        const nodeY = node.y || 0;

        // Draw the circle with dynamic size and color
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = getColor(genreNode.artistCount);
        ctx.fill();

        // Draw the genre name text, centered and contained within the circle
        ctx.font = `${fontSize}px Geist`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(genreNode.name, nodeX, nodeY);
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
            linkVisibility={false}
            linkColor='#666666'
            linkCurvature={0.2}
            nodeVisibility={true}
            onNodeClick={node => onNodeClick(node.name)}
            nodeCanvasObject={nodeCanvasObject}
            nodeCanvasObjectMode={() => 'replace'}
            nodeVal={(node: Genre) => calculateRadius(node.artistCount)}
            nodePointerAreaPaint={nodePointerAreaPaint}
        />
    )
}

export default GenresForceGraph;