import {useEffect, useState} from "react";
import {Genre, NodeLink} from "@/types";
import axios, {AxiosError} from "axios";

const url = 'http://localhost:3000/genres';

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genreLinks, setGenreLinks] = useState<NodeLink[]>([]);
    const [genresLoading, setGenresLoading] = useState(true);
    const [genresError, setGenresError] = useState<AxiosError>();

    const fetchGenres = async () => {
        setGenresLoading(true);
        try {
            const response = await axios.get(url);
            setGenres(response.data.genres);
            setGenreLinks(response.data.links);
        } catch (err) {
            if (err instanceof AxiosError) {
                setGenresError(err);
            }
        }
        setGenresLoading(false);
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    return { genres, genreLinks, genresLoading, genresError };
}

export default useGenres;