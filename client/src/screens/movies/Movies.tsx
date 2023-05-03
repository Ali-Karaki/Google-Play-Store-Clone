import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoviesServices from "../../services/movies.service";
import Typography from "@mui/material/Typography";
import CarouselComponent, {
} from "../../components/carousel/Carousel";
import { useLocation } from "react-router-dom";
import { MovieModel } from "../../models/movie.model";
import { CarouselData } from "../../components/carousel/Carousel.types";

const Movies = () => {
  const location = useLocation();

  const [movies, setMovies] = useState<MovieModel[]>([]);

  const getMovies = async () => {
    const resMovies: MovieModel[] = await MoviesServices.getMovies();
    setMovies(resMovies);
  };

  const getFilteredMovies = (section: string): CarouselData[] => {
    let filteredMovies = movies;
    if (window.location.href.includes("?")) {
      const filter = window.location.href.split("?")[1];
      const [filterKey, filterValue] = filter.split("=");
      filteredMovies = filteredMovies.filter((movie: any) => {
        return movie[filterKey]
          .map((dev: string) => dev.toLowerCase())
          .includes(filterValue.toLowerCase());
      });
    }
    if (section !== "") {
      filteredMovies = filteredMovies.filter((movie: any) => {
        return movie["tags"]
          .map((dev: string) => dev.toLowerCase())
          .includes(section.toLowerCase());
      });
    }

    return filteredMovies.map((item: MovieModel) => ({
      id: item._id!,
      name: item.name,
      logo: item.logo,
      stars: item.stars,
      price: item.price
    }));
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getFilteredMovies("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const sections = [
    "Action",
    "Comedy",
    "Drama",
    "Thriller",
    "Horror",
    "Romance",
    "Science Fiction",
  ];

  return (
    <Box sx={styles.container}>
      {sections.map((section: string) => (
        <React.Fragment key={section}>
          {getFilteredMovies(section).length > 0 ? (
            <Box sx={styles.row}>
              <Typography textTransform="none" sx={styles.sectionTitle}>
                {section}
              </Typography>
              <CarouselComponent data={getFilteredMovies(section)} />
            </Box>
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

const styles = {
  container: {
    margin: "3% 7%",
    position: "relative",
    zIndex: 0,
  },
  row: {
    marginTop: "40px",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "22px !important",
    fontWeight: "600 !important",
    color: "#5F6368",
  },
};

export default Movies;
