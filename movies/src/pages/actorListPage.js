import React, {useState} from "react";
import {getPopularActors} from "../api/tmdb-api";
import ActorListPageTemplate from '../components/actor/templeteActorListPage'
import AddToPreviewsIcon from '../components/cardIcons/addToPreviews'
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import AddToFollowedActorsIcon from "../components/cardIcons/addToFollowedActorsIcon";
import PaginationComponent from "../pagination/paginationTemplate";

const ActorListPage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {data, error, isLoading, isError} = useQuery(
        ['actor', {page: currentPage}], getPopularActors)

    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const actors = data.results;
    const totalPages = Math.min(data.total_pages, 500);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const following = actors.filter(m => m.actor)
    localStorage.setItem('favorites', JSON.stringify(following))

    // Redundant, but necessary to avoid app crashing.
    // const addToFavorites = (movieId) => true

    return (
        <>
            <ActorListPageTemplate
                title='Popular Actor'
                actors={actors}
                action={(actor) => {
                    return <AddToFollowedActorsIcon actor={actor}/>
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
export default ActorListPage;
