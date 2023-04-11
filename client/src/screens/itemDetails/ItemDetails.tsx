import React from "react";
import { useLocation } from "react-router-dom";
import AppsServices from "../../services/apps.service";
import MoviesServices from "../../services/movies.service";
import BooksServices from "../../services/books.service";
import { Box } from "@mui/material";

export default function ItemDetails() {
  const location = useLocation();
  const [item, setItem] = React.useState();

  const [empty, store, page, view, itemId] = location.pathname.split("/");

  const getApp = async () => {
    const res: any = await AppsServices.getApp(itemId);
    setItem(res);
  };
  const getMovie = async () => {
    const res: any = await MoviesServices.getMovie(itemId);
    setItem(res);
  };
  const getBook = async () => {
    const res: any = await BooksServices.getBook(itemId);
    setItem(res);
  };

  React.useEffect(() => {
    if (page === "movies") {
      getMovie();
    } else if (page === "books") {
      getBook();
    } else {
      getApp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, location.pathname]);

  return (
    <Box sx={styles.container}>
      <div>hello</div>
      <div>{JSON.stringify(item)}</div>
    </Box>
  );
}

const styles = {
  container: {
    margin: "7% 7%",
    position: "relative",
    zIndex: 0,
  },
};
