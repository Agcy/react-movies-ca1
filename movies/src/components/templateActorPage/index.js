import React, { useState, useEffect } from "react";
import ActorHeader from "../headerActor"; // 假设有 ActorHeader 组件
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getActorImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const TemplateActorPage = ({ actor, children }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const { data, error, isLoading, isError } = useQuery(
        ["images", { id: actor.id }],
        getActorImages
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    const images = data.profiles;

    const handlePrev = () => {
        setCurrentImgIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    };

    const handleNext = () => {
        setCurrentImgIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <>
            <ActorHeader actor={actor} />

            <Grid container spacing={5} sx={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <Paper sx={{
                        position: 'relative',
                        width: '100%',
                        height: 500,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${images[currentImgIndex].file_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        <IconButton
                            sx={{ position: 'absolute', left: 0, top: '50%' }}
                            onClick={handlePrev}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton
                            sx={{ position: 'absolute', right: 0, top: '50%' }}
                            onClick={handleNext}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Paper>
                </Grid>

                <Grid item xs={9}>
                    {children} {/* 这里可以是演员的额外信息 */}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateActorPage;
