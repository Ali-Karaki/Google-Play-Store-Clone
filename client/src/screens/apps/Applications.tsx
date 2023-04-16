import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AppModel } from "../../models/apps.model";
import AppsServices from "../../services/apps.service";
import Typography from "@mui/material/Typography";
import CarouselComponent, {
} from "../../components/carousel/Carousel";
import { useLocation } from "react-router-dom";
import React from "react";
import { CarouselData } from "../../components/carousel/Carousel.types";

const Applications = () => {
  const location = useLocation();

  const [apps, setApps] = useState<AppModel[]>([]);

  const getApps = async () => {
    const resApps: AppModel[] = await AppsServices.getApps();
    setApps(resApps);
  };

  const getFilteredApps = (section: string): CarouselData[] => {
    let filteredApps = apps;
    if (window.location.href.includes("?")) {
      const filter = window.location.href.split("?")[1];
      const [filterKey, filterValue] = filter.split("=");
      filteredApps = filteredApps.filter((app: any) => {
        return app[filterKey]
          .map((dev: string) => dev.toLowerCase())
          .includes(filterValue.toLowerCase());
      });
    }
    if (section !== "") {
      filteredApps = filteredApps.filter((app: any) => {
        return app["tags"]
          .map((dev: string) => dev.toLowerCase())
          .includes(section.toLowerCase());
      });
    }

    return filteredApps.map((item: AppModel) => ({
      id: item._id!,
      name: item.name,
      logo: item.logo,
      stars: item.stars,
    }));
  };

  useEffect(() => {
    getApps();
  }, []);

  useEffect(() => {
    getFilteredApps("");
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
          {getFilteredApps(section).length > 0 ? (
            <Box sx={styles.row}>
              <Typography textTransform="none" sx={styles.sectionTitle}>
                {section}
              </Typography>
              <CarouselComponent data={getFilteredApps(section)} />
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

export default Applications;
