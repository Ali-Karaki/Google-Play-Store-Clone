import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton/IconButton";

interface FilterNavModel {
  key: string;
  label: string;
  icon?: any;
  href: string;
  filteredBy: string;
}

const FilteringNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const GAMES = [];
  const MOVIES = [];
  const BOOKS = [];
  const APPS: FilterNavModel[] = [
    {
      key: "phone",
      label: "Phone",
      icon: <PhoneIphoneIcon />,
      href: "/store/apps",
      filteredBy: "device",
    },
    {
      key: "tablet",
      label: "Tablet",
      icon: <></>,
      href: "/store/apps",
      filteredBy: "device",
    },
    {
      key: "tv",
      label: "TV",
      icon: <></>,
      href: "/store/apps",
      filteredBy: "device",
    },
  ];

  const changeRoute = (btn: FilterNavModel) => {
    navigate(`${btn.href}?${btn.filteredBy}=${btn.key}`);
  };

  const getFilterBar = () => {
    return APPS;
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
    padding: "10px",
    width: "fit-content",
  },
  btnIcon: {
    margin: "0px",
    padding: "0px",
  },
  btnLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5F6368",
  },
};

export default FilteringNavBar;
