import React, {useState} from "react";
import {getUpcomingMovie} from "../api/tmdb-api";
import PageTemplate from '../components/movie/templateMovieListPage'
import AddToPreviewsIcon from '../components/cardIcons/addToPreviews'
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import PaginationComponent from "../pagination/paginationTemplate";
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const UpcomingMoviePage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {data, error, isLoading, isError} = useQuery(
        ['upcoming', {page: currentPage}], getUpcomingMovie)

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
    const favorites = movies.filter(m => m.upcoming)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    // Redundant, but necessary to avoid app crashing.
    // const addToFavorites = (movieId) => true

    return (
        <Box sx={{
            background: 'linear-gradient(to right, #8e44ad, #3498db)'
        }}>
            <Grid item xs={12}>
                <Header title='Upcoming Movies' />
            </Grid>
            <PageTemplate
                movies={movies}
                action={(movie) => {
                    return <AddToPreviewsIcon movie={movie}/>
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
export default UpcomingMoviePage;
