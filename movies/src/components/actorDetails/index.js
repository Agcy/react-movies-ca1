import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActorDetails } from '../api/tmdb-api';

const ActorDetails = () => {
    const [actor, setActor] = useState({});
    const { id } = useParams(); // 从URL获取演员ID

    useEffect(() => {
        getActorDetails(id).then(actorData => {
            setActor(actorData);
        });
    }, [id]);

    return (
        <div>
            <h2>{actor.name}</h2>
            {/* 展示演员的详细信息 */}
        </div>
    );
};

export default ActorDetails;
