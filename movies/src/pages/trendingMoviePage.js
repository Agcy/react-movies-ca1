// TrendingMoviesPage.js
import React, {useState} from 'react';
import TrendingMovies from '../components/movie/trendingMovies';
import {useQuery} from "react-query";
import {getTrendingMovies} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPreviews from "../components/cardIcons/removeFromPreviews";
import PageTemplate from "../components/movie/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import PaginationComponent from "../pagination/paginationTemplate";
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const TrendingMoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {data, error, isLoading, isError} = useQuery(
        ['trending', {page: currentPage}], getTrendingMovies)

    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;
    const totalPages = Math.min(data.total_pages, 500);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    return (
        <Box sx={{
            background: 'linear-gradient(to bottom, #c0b2d7 0%, #6d5494 100%)'
        }}>
            <Grid item xs={12}>
                <Header title="Trending Movies" />
            </Grid>
            <PageTemplate
                movies={movies}
                action={(movie) => {
                    return (
                        <AddToFavoritesIcon movie={movie}/>
                    );
                }}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default TrendingMoviesPage;
