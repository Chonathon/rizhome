import {useEffect, useState} from "react";
import {Genre} from "@/types";
import axios, {AxiosError} from "axios";

const url = 'http://localhost:3000/genres';

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genresLoading, setGenresLoading] = useState(true);
    const [genresError, setGenresError] = useState<AxiosError>();

    const fetchGenres = async () => {
        setGenresLoading(true);
        try {
            const response = await axios.get(url);
            console.log(response.data.genres);
            setGenres(response.data.genres);
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

    return { genres, genresLoading, genresError };
}

export default useGenres;