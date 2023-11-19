import React from "react";
import FilterMoviesCard from "../components/movies/filterMoviesCard";

export default {
  title: "Home Page/FilterMoviesCard",
  component: FilterMoviesCard,
};

export const Basic = () => {
  return <FilterMoviesCard />;
};
Basic.storyName = "Default";
