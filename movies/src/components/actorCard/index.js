import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import placeholderImg from '../../images/pexels-dziana-hasanbekava-5480827.jpg';

export default function ActorCard({ actor, action }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar>
                        {/* 演员的首字母或其他标识 */}
                        {actor.name.charAt(0)}
                    </Avatar>
                }
                title={
                    <Typography variant="h5" component="p">
                        {actor.name}
                    </Typography>
                }
            />
            <CardMedia
                sx={{ height: 500 }}
                image={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : placeholderImg
                }
            />
            <CardContent>
                {/* 可以在这里添加额外的演员信息，如生日、国籍等 */}
            </CardContent>
            <CardActions disableSpacing>
                {action && action(actor)}
                <Link to={`/actors/${actor.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
