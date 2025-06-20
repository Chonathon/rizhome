import {useEffect, useState} from "react";
import {Genre, GenreArtistCountMap} from "@/types";
import axios, {AxiosError} from "axios";

const url = 'http://localhost:3000/genres/artist-count';

const useGenreArtistsCount = () => {
    const [genreArtistsCounts, setGenreArtistsCounts] = useState<GenreArtistCountMap>({"1": 0});
    const [genreArtistCountLoading, setGenreArtistCountLoading] = useState(true);
    const [genreArtistCountError, setGenreArtistCountError] = useState<AxiosError>();

    const fetchGenreArtistCount = async () => {
        setGenreArtistCountLoading(true);
        try {
            const response = await axios.get(url);
            setGenreArtistsCounts(response.data.genreMap);
        } catch (err) {
            if (err instanceof AxiosError) {
                setGenreArtistCountError(err);
            }
        }
        setGenreArtistCountLoading(false);
    }

    useEffect(() => {
        fetchGenreArtistCount();
    }, []);

    return { genreArtistsCounts, genreArtistCountLoading, genreArtistCountError };
}

export default useGenreArtistsCount;