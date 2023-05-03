import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppModel } from "../../models/apps.model";
import AppsServices from "../../services/apps.service";
import Typography from "@mui/material/Typography";
import CarouselComponent, {
} from "../../components/carousel/Carousel";
import { useLocation } from "react-router-dom";
import { CarouselData } from "../../components/carousel/Carousel.types";

const Games = () => {
  const location = useLocation();

  const [games, setGames] = useState<AppModel[]>([]);

  const getGames = async () => {
    const resGames: AppModel[] = await AppsServices.getGames();
    setGames(resGames);
  };

  const getFilteredGames = (section: string): CarouselData[] => {
    let filteredGames = games;
    if (window.location.href.includes("?")) {
      const filter = window.location.href.split("?")[1];
      const [filterKey, filterValue] = filter.split("=");
      filteredGames = filteredGames.filter((game: any) => {
        return game[filterKey]
          .map((dev: string) => dev.toLowerCase())
          .includes(filterValue.toLowerCase());
      });
    }
    if (section !== "") {
      filteredGames = filteredGames.filter((game: any) => {
        return game["tags"]
          .map((dev: string) => dev.toLowerCase())
          .includes(section.toLowerCase());
      });
    }

    return filteredGames.map((item: AppModel) => ({
      id: item._id!,
      name: item.name,
      logo: item.logo,
      stars: item.stars,
      price: item.price
    }));
  };

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    getFilteredGames("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const sections = [
    "Business",
    "Communication",
    "Finance",
    "Health",
    "Travel",
    "Action",
    "Arcade",
    "Sports",
    "Simulation",
  ];

  return (
    <Box sx={styles.container}>
      {sections.map((section: string) => (
        <React.Fragment key={section}>
          {getFilteredGames(section).length > 0 ? (
            <Box sx={styles.row}>
              <Typography textTransform="none" sx={styles.sectionTitle}>
                {section}
              </Typography>
              <CarouselComponent data={getFilteredGames(section)} />
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

export default Games;
