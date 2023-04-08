import { Box } from "@mui/material";
import React from "react";
import AppAddEdit from "../../components/forms/AppAddEdit";
import { useLocation } from "react-router-dom";
import BookAddEdit from "../../components/forms/BookAddEdit";
import MovieAddEdit from "../../components/forms/MovieAddEdit";

const ItemAddEdit = () => {
  const location = useLocation();
  const page = location.pathname;
  const item = location.state?.item;

  return (
    <Box sx={styles.container}>
      {(page.includes("app") || page.includes("game")) && (
        <AppAddEdit editingApp={page.includes("editItem") ? item : null} />
      )}
      {page.includes("movie") && (
        <MovieAddEdit editingMovie={page.includes("editItem") ? item : null} />
      )}
      {page.includes("book") && (
        <BookAddEdit editingBook={page.includes("editItem") ? item : null} />
      )}
    </Box>
  );
};

const styles = {
  container: {
    margin: "2% 7%",
    position: "relative",
    zIndex: 0,
  },
};

export default ItemAddEdit;
