import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletIcon from "@mui/icons-material/Tablet";
import TvIcon from "@mui/icons-material/Tv";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton/IconButton";

interface FilterNavModel {
  key: string;
  label: string;
  icon?: any;
  href: string;
  filteredBy: string;
}

const moviesFilter = [
  {
    key: "action",
    label: "Action",
    icon: <></>,
    href: "/store/movies",
    filteredBy: "tags",
  },
  {
    key: "comedy",
    label: "Comedy",
    icon: <></>,
    href: "/store/movies",
    filteredBy: "tags",
  },
  {
    key: "drama",
    label: "Drama",
    icon: <></>,
    href: "/store/movies",
    filteredBy: "tags",
  },
  {
    key: "thriller",
    label: "Thriller",
    icon: <></>,
    href: "/store/movies",
    filteredBy: "tags",
  },
];

const booksFilter = [
  {
    key: "ebook",
    label: "Ebook",
    icon: <AutoStoriesIcon />,
    href: "/store/books",
    filteredBy: "type",
  },
  {
    key: "audiobook",
    label: "Audiobook",
    icon: <PlayLessonIcon />,
    href: "/store/books",
    filteredBy: "type",
  },
];
const appsFilter: FilterNavModel[] = [
  {
    key: "phone",
    label: "Phone",
    icon: <PhoneIphoneIcon />,
    href: "/store/apps",
    filteredBy: "devices",
  },
  {
    key: "tablet",
    label: "Tablet",
    icon: <TabletIcon />,
    href: "/store/apps",
    filteredBy: "devices",
  },
  {
    key: "tv",
    label: "TV",
    icon: <TvIcon />,
    href: "/store/apps",
    filteredBy: "devices",
  },
];

const gamesFilter: FilterNavModel[] = [
  {
    key: "windows",
    label: "Windows",
    icon: <LaptopWindowsIcon />,
    href: "/store/games",
    filteredBy: "devices",
  },
  {
    key: "phone",
    label: "Phone",
    icon: <PhoneIphoneIcon />,
    href: "/store/games",
    filteredBy: "devices",
  },
  {
    key: "tablet",
    label: "Tablet",
    icon: <TabletIcon />,
    href: "/store/games",
    filteredBy: "devices",
  },
  {
    key: "tv",
    label: "TV",
    icon: <TvIcon />,
    href: "/store/games",
    filteredBy: "devices",
  },
];

const FilteringNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const changeRoute = (btn: FilterNavModel) => {
    navigate(`${btn.href}?${btn.filteredBy}=${btn.key}`);
  };

  const getFilterBar = () => {
    return location.pathname.includes("movies")
      ? moviesFilter
      : location.pathname.includes("books")
      ? booksFilter
      : location.pathname.includes("games")
      ? gamesFilter
      : appsFilter;
  };

  return (
    <Box marginTop={2} sx={styles.container}>
      {getFilterBar().map((btn: FilterNavModel) => (
        <Button
          sx={styles.btns}
          variant="outlined"
          key={btn.key}
          onClick={() => {
            changeRoute(btn);
          }}
        >
          {btn.icon && <IconButton sx={styles.btnIcon}>{btn.icon}</IconButton>}
          <Typography sx={styles.btnLabel} textTransform="none">
            {btn.label}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

const styles = {
  container: {
    paddingTop: "70px",
    marginLeft: "7%",
  },
  btns: {
    borderRadius: "20px",
    fontSize: "14px",
    margin: "0px 5px",
    height: "35px",
    padding: "10px 15px",
    width: "fit-content",
  },
  btnIcon: {
    margin: "0px",
    padding: "0px",
  },
  btnLabel: {
    fontSize: "12px !important",
    fontWeight: "600",
    color: "#5F6368",
    padding: "0px 10px",
  },
};

export default FilteringNavBar;
