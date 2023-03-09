import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import googlePlayIcon from "../../icons/Google_Play_Logo.png";
import SearchBar from "./SearchBar";
import AccountPopover from "./AccountPopover";

const NavBar = () => {
  const PAGES = ["Games", "Apps", "Movies", "Books"];

  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(`/store/${route.toLowerCase()}`);
  };

  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setIsSearching(true);
  };
  const handleHelp = () => {};
  const handleProfile = () => {};

  return (
    <Box sx={styles.container}>
      <AppBar position="static">
        <Toolbar sx={styles.toolbar}>
          <Box sx={styles.mainCols}>
            <Box sx={styles.navLinks}>
              <Button
                onClick={() => handleNavigation("games")}
                variant="text"
                sx={styles.appBarLabel}
              >
                <img
                  src={googlePlayIcon}
                  style={styles.icon}
                  alt="googlePlayIcon"
                />
              </Button>
              <Typography textTransform="none" sx={styles.appBarLabel}>
                Google Play
              </Typography>

              {!isSearching && (
                <Box sx={styles.pages}>
                  {PAGES.map((page) => {
                    return (
                      <Typography
                        key={page}
                        onClick={() => handleNavigation(page)}
                        textTransform="none"
                        sx={{
                          ...styles.links,
                          borderBottom:
                            `/store/${page.toLowerCase()}` ===
                            window.location.pathname
                              ? "3px solid #002800"
                              : "none",
                        }}
                      >
                        {page}
                      </Typography>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
          {isSearching && (
            <SearchBar
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
              }}
              onBlur={() => setIsSearching(false)}
            ></SearchBar>
          )}
          <Box sx={styles.mainCols}>
            <Box sx={styles.iconsGroup}>
              {!isSearching && (
                <SearchIcon onClick={handleSearch} sx={styles.rightIcons} />
              )}
              <HelpOutlineIcon onClick={handleHelp} sx={styles.rightIcons} />
              <AccountPopover>
                <></>
              </AccountPopover>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    position: "absolute",
    width: "100%",
    marginTop: "-16px",
    zIndex: "1",
  },
  navLinks: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pages: {
    display: "flex",
    marginLeft: "30px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  toolbar: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconsGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    marginRight: "20px",
  },
  icon: {
    width: "85px",
  },
  appBarLabel: {
    fontFamily: "'Google Sans', 'Roboto', 'Arial', sans-serif",
    fontWeight: "500",
    color: "#5F6368",
    fontSize: "22px",
    textAlign: "left",
    padding: "0px",
  },
  links: {
    fontFamily: "'Google Sans', 'Roboto', 'Arial', sans-serif",
    fontWeight: "500",
    color: "#5F6368",
    fontSize: "14px",
    textAlign: "left",
    margin: "0px 15px",
    padding: "20px 0px",
  },
  mainCols: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rightIcons: {
    display: "flex",
    flexDirection: "column",
    color: "#5F6368",
    fontSize: "25px",
    margin: "0px 10px",
  },
};

export default NavBar;
