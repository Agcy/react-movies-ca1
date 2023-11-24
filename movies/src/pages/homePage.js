import React, {useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import { getMovies } from '../api/tmdb-api';
import PageTemplate from '../components/movie/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PaginationComponent from '../pagination/paginationTemplate';
import { useNavigate, useParams } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(
        ['discover', { page: currentPage }], getMovies
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;
    const totalPages = data.total_pages;

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    return (
        <>
            <PageTemplate
                title="Discover Movies"
                movies={movies}
                action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default HomePage;
