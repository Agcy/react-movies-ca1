import React, {useState} from "react";
import {getUpcomingMovie} from "../api/tmdb-api";
import PageTemplate from '../components/movie/templateMovieListPage'
import AddToPreviewsIcon from '../components/cardIcons/addToPreviews'
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import PaginationComponent from "../pagination/paginationTemplate";

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
        <>
            <PageTemplate
                title='Upcoming Movies'
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
        </>
    );
};
export default UpcomingMoviePage;
