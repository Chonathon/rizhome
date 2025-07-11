import {envBoolean} from "@/lib/utils";
import {useEffect, useState} from "react";
import {Artist} from "@/types";
import axios, {AxiosError} from "axios";

const url = envBoolean(import.meta.env.VITE_USE_LOCAL_SERVER)
    ? import.meta.env.VITE_LOCALHOST
    : import.meta.env.VITE_SERVER_URL || `https://rhizome-server-production.up.railway.app`;

const useMBArtistSearch = (query?: string) => {
    const [mbSearchResults, setSearchResults] = useState<Artist[]>([]);
    const [mbSearchError, setSearchError] = useState<AxiosError>();
    const [mbSearchLoading, setSearchLoading] = useState(false);

    const search = async () => {
        if (query) {
            setSearchLoading(true);
            try {
                const response = await axios.get(`${url}/artists/mb-search/${query}`);
                setSearchResults(response.data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setSearchError(err);
                }
            }
            setSearchLoading(false);
        }
    }

    useEffect(() => {
        search();
    }, [query]);

    return { mbSearchResults, mbSearchLoading, mbSearchError };
}

export default useMBArtistSearch;