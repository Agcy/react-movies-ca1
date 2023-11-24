import React, {useState, useEffect} from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function MovieListPageTemplate({movies, action, images, interval = 3000}) {

    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        });

    return (
        <Grid container sx={{padding: '20px'}}>
            <Box sx={{maxWidth: 600, margin: 'auto'}}>
                {images.map((image, index) => (
                    <Paper
                        key={index}
                        style={{
                            display: index === currentImageIndex ? 'block' : 'none',
                            width: '100%',
                            height: '300px',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                ))}
            </Box>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FilterCard
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
        </Grid>
    );
}

export default MovieListPageTemplate;
