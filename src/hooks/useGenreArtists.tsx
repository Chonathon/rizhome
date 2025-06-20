import {useEffect, useState} from "react";
import {Artist, NodeLink} from "@/types";
import axios, {AxiosError} from "axios";

const url = 'http://localhost:3000/artists/';

const useGenreArtists = (genre?: string) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [artistLinks, setArtistLinks] = useState<NodeLink[]>([]);
    const [artistsLoading, setArtistsLoading] = useState(true);
    const [artistsError, setArtistsError] = useState<AxiosError>();

    const fetchArtists = async () => {
        if (genre) {
            setArtistsLoading(true);
            try {
                const response = await axios.get(`${url}"${genre}"`);
                setArtists(response.data.artists);
                setArtistLinks(response.data.links);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setArtistsError(err);
                }
            }
            setArtistsLoading(false);
        }
    }

    useEffect(() => {
        fetchArtists();
    }, [genre]);

    return { artists, artistsLoading, artistsError, artistLinks };
}

export default useGenreArtists;