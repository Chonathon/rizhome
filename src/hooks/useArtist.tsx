import {useEffect, useState} from "react";
import {Artist, LastFMArtistJSON, NodeLink} from "@/types";
import axios, {AxiosError} from "axios";
import {envBoolean} from "@/lib/utils";

const url = envBoolean(import.meta.env.VITE_USE_LOCAL_SERVER)
    ? import.meta.env.VITE_LOCALHOST
    : import.meta.env.VITE_SERVER_URL || `https://rhizome-server-production.up.railway.app`;

const useArtist = (artist?: Artist) => {
    const [artistData, setArtistData] = useState<LastFMArtistJSON>();
    const [artistLoading, setArtistLoading] = useState(true);
    const [artistError, setArtistError] = useState<AxiosError>();

    const fetchArtist = async () => {
        if (artist) {
            setArtistLoading(true);
            try {
                const response = await axios.get(`${url}/artists/data/${artist.id}`);
                const image = await axios.get(`${url}/artists/image/${artist.id}`);
                setArtistData({...response.data, image: image.data});
                setArtistError(undefined);
            } catch (err) {
                try {
                    const response = await axios.get(`${url}/artists/data/${artist.name}`);
                    const image = await axios.get(`${url}/artists/image/${artist.id}`);
                    setArtistData({...response.data, image: image.data});
                    setArtistError(undefined);
                } catch (err) {
                    if (err instanceof AxiosError) {
                        setArtistError(err);
                    }
                }
                if (err instanceof AxiosError) {
                    setArtistError(err);
                }
            }
            setArtistLoading(false);
        }
    }

    useEffect(() => {
        fetchArtist();
    }, [artist]);

    return { artistData, artistLoading, artistError };
}

export default useArtist;