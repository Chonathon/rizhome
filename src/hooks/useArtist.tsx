import {useEffect, useState} from "react";
import {LastFMArtistJSON} from "@/types";
import axios, {AxiosError} from "axios";
import {envBoolean} from "@/lib/utils";

const url = envBoolean(import.meta.env.VITE_USE_LOCAL_SERVER)
    ? import.meta.env.VITE_LOCALHOST
    : import.meta.env.VITE_SERVER_URL || `https://rhizome-server-production.up.railway.app`;

const useArtist = (mbid?: string) => {
    const [artistData, setArtistData] = useState<LastFMArtistJSON>();
    const [artistLoading, setArtistLoading] = useState(true);
    const [artistError, setArtistError] = useState<AxiosError>();

    const fetchArtist = async () => {
        if (mbid) {
            setArtistLoading(true);
            try {
                const response = await axios.get(`${url}/artists/data/${mbid}`);
                setArtistData(response.data);
                setArtistError(undefined);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setArtistError(err);
                }
            }
            setArtistLoading(false);
        }
    }

    useEffect(() => {
        fetchArtist();
    }, [mbid]);

    return { artistData, artistLoading, artistError };
}

export default useArtist;