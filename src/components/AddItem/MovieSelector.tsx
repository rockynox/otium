import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {MEDIA_TYPE, MovieDBResult} from "../../types/theMovieDB";

interface MovieSelectorProps {
    handleSelectedItem: (selectedItem: MovieDBResult | null) => void
}


export const MovieSelector = (props: MovieSelectorProps) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<MovieDBResult[]>([]);
    const [query, setQuery] = useState<string>("");
    const loading = open && options.length === 0;

    function getSortByMediaType() {
        return (result1: MovieDBResult, result2: MovieDBResult) => {
            if (result1.media_type < result2.media_type) return -1;
            if (result1.media_type > result2.media_type) return 1;
            return 0;
        };
    }

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
            if (results) {
                const moviesAndTvShows = results.filter((result: MovieDBResult) => {
                    return result?.media_type !== MEDIA_TYPE.person;
                });
                if (active) {
                    moviesAndTvShows.sort(getSortByMediaType());
                    setOptions(moviesAndTvShows);
                }
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
        switch (movieDBResult.media_type) {
            case MEDIA_TYPE.movie:
                return (<div className="container">
                    <div className="left">
                        {movieDBResult.original_title}
                    </div>
                    <div className="right">
                        <img src={"https://image.tmdb.org/t/p/w200" + movieDBResult.poster_path}
                             className="movie-picture" alt="MoviePicture"/>
                    </div>
                </div>);
            case MEDIA_TYPE.tv:
                return (<div>
                    {movieDBResult.name}
                </div>);
            default:
                return (<div/>);
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
            groupBy={(option: MovieDBResult) => option.media_type.toString()}
            onClose={() => {
                setOpen(false);
            }}
            filterOptions={(options: MovieDBResult[], state) => options.filter(movieDbResult => movieDbResult.media_type !== MEDIA_TYPE.person)}
            getOptionSelected={(option, value: MovieDBResult) => option.id === value.id}
            getOptionLabel={(option) => option.media_type === MEDIA_TYPE.movie ? option.title : option.name}
            options={options}
            loading={loading}
            onInputChange={((event, value) => setQuery(value))}
            onChange={(event: any, value: MovieDBResult | null) => props.handleSelectedItem(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Entrer le nom de votre film, série, ..."
                />
            )}
            renderOption={(option: MovieDBResult, state) =>
                renderOption(option)
            }
        />
    );
};
