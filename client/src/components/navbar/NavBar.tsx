import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import googlePlayIcon from "../../icons/Google_Play_Logo.png";
import { LOCAL_STORAGE } from "../../models/localstorage.model";
import PopoverComp from "./PopoverComp";
import ListItems, { ListItemI } from "./ListItems";
import SearchBar from "./SearchBar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const NavBar = () => {
  const PAGES = ["Games", "Apps", "Movies", "Books"];

  const navigate = useNavigate();
  const location = useLocation();

  const [accountData, setAccountData] = useState<ListItemI[]>([]);

  const handleNavigation = (route: string) => {
    let path = `/store/${route.toLowerCase()}`;

    const isAdminMode =
      sessionStorage.getItem(LOCAL_STORAGE.IS_ADMIN_MODE) === "true";

    path = isAdminMode ? "/admin" + path : path;
    navigate(path);
  };

  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleHelp = () => {};

  const signOut = async () => {
    localStorage.removeItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
    await auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const adminMode = () => {
    const isAdmin = sessionStorage.getItem(LOCAL_STORAGE.IS_ADMIN);
    if (isAdmin) {
      const isAdminMode: boolean =
        sessionStorage.getItem(LOCAL_STORAGE.IS_ADMIN_MODE) === "true";

      if (isAdminMode) {
        navigate(`/store/apps`);
      } else {
        navigate(`/admin/store/apps`);
      }
      sessionStorage.setItem(
        LOCAL_STORAGE.IS_ADMIN_MODE,
        (!isAdminMode).toString()
      );
    }
  };

  const getAccountData = () => {
    const data = [
      {
        key: "admin",
        isAdmin: true,
        isAdminMode: false,
        label: "Admin",
        onClick: () => adminMode(),
        icon: <AdminPanelSettingsIcon />,
      },
      {
        key: "addItem",
        isAdmin: true,
        isAdminMode: true,
        label: "Add Item",
        onClick: () => {},
        icon: <AddIcon />,
      },
      {
        key: "signout",
        isAdmin: false,
        isAdminMode: false,
        label: "Sign out",
        onClick: () => signOut(),
        icon: <ExitToAppIcon />,
      },
    ];

    const filteredData = data
      .filter(
        (item) =>
          !(
            sessionStorage.getItem(LOCAL_STORAGE.IS_ADMIN) === "false" &&
            item.isAdmin
          )
      )
      .filter(
        (item) =>
          !(
            sessionStorage.getItem(LOCAL_STORAGE.IS_ADMIN_MODE) === "false" &&
            item.isAdminMode
          )
      );

    setAccountData(filteredData);
  };

  useEffect(() => {
    getAccountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Box sx={styles.container}>
      <AppBar sx={styles.appBar} position="static">
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
                          borderBottom: window.location.pathname.includes(
                            page.toLowerCase()
                          )
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
              <PopoverComp>
                <ListItems data={accountData} />
              </PopoverComp>
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
    top: 10,
    width: "100%",
    marginTop: "-16px",
    zIndex: "1",
    marginLeft: "-20px",
  },
  appBar: {
    boxShadow: "none",
    position: "fixed",
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
    boxShadow: "rgb(38, 57, 77) 0px 20px 13px -20px"
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
    fontWeight: "600",
    color: "#5F6368",
    fontSize: "22px",
    textAlign: "left",
    padding: "0px",
  },
  links: {
    fontFamily: "'Google Sans', 'Roboto', 'Arial', sans-serif",
    fontWeight: "600",
    color: "#5F6368",
    fontSize: "14px",
    textAlign: "left",
    margin: "0px 15px !important",
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
