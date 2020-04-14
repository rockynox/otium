import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {MEDIA_TYPE, MovieDBResult} from "../types/theMovieDB";

interface MovieSelectorProps {
    handleSelectedItem: (selectedItem: MovieDBResult | null) => void
}


export const MovieSelector = (props: MovieSelectorProps) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<MovieDBResult[]>([]);
    const [query, setQuery] = useState<string>("");
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
        (async () => {
            const searchParams = {
                api_key: "967145b69b2c2e37e648fa41e4a60ec7",
                language: "fr",
                query: query,
                page: "",
                include_adult: "false"
            };
            const urlParams = new URLSearchParams(Object.entries(searchParams));
            const results = await fetch("https://api.themoviedb.org/3/search/multi?" + urlParams)
                .then((response) => response.json())
                .then(response => response.results as MovieDBResult[]);
            if (results && active) {
                const movies = results.filter((result: MovieDBResult) => {
                    return result?.media_type === MEDIA_TYPE.movie;
                });
                setOptions(movies);
            }
        })();
        return () => {
            active = false;
        };
    }, [loading, query]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const renderOption = (movieDBResult: MovieDBResult) => {
        if (movieDBResult.media_type === MEDIA_TYPE.movie) {
            return (<div className="container">
                <div className="left">
                    {movieDBResult.title}
                </div>
                <div className="right">
                    <img src={"https://image.tmdb.org/t/p/w200" + movieDBResult.poster_path}
                         className="movie-picture" alt="MoviePicture"/>
                </div>
            </div>);
        }
    };

    return (
        <Autocomplete
            id="Film input"
            clearOnEscape
            autoHighlight
            openOnFocus
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value: MovieDBResult) => option.id === value.id}
            getOptionLabel={(option) => option.media_type === MEDIA_TYPE.movie ? option.title : ""}
            options={options}
            loading={loading}
            onInputChange={((event, value) => setQuery(value))}
            onChange={(event: any, value: MovieDBResult | null) => props.handleSelectedItem(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Entrer le nom de votre film"
                />
            )}
            renderOption={(option: MovieDBResult, state) =>
                renderOption(option)
            }
        />
    );
};
