import {useEffect, useState} from "react";
import {Artist, LastFMArtistJSON} from "@/types";
import axios, {AxiosError} from "axios";
import {envBoolean} from "@/lib/utils";

const url = envBoolean(import.meta.env.VITE_USE_LOCAL_SERVER)
    ? import.meta.env.VITE_LOCALHOST
    : import.meta.env.VITE_SERVER_URL || `https://rhizome-server-production.up.railway.app`;

const useArtist = (artist?: Artist) => {
    const [artistData, setArtistData] = useState<LastFMArtistJSON>();
    const [artistLoading, setArtistLoading] = useState(false);
    const [artistError, setArtistError] = useState<AxiosError>();

    const fetchArtist = async () => {
        if (artist) {
            setArtistLoading(true);
            let response;
            try {
                response = await axios.get(`${url}/artists/data/${artist.id}/${artist.name}`);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setArtistError(err);
                }
            }
            if (response) {
                let image;
                try {
                    image = await axios.get(`${url}/artists/image/${artist.id}`);
                } catch (err) {

                }
                const data = {...response.data, image: image ? image.data : undefined}
                setArtistData(data);
                setArtistError(undefined);
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