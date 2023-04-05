import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import AppsServices from "../../services/apps.service";
import TableAdmin from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import MoviesServices from "../../services/movies.service";
import BooksServices from "../../services/books.service";

const Admin = () => {
  const location = useLocation();

  const [data, setData] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const handleDelete = async () => {
    if (location.pathname.includes("games")) {
      await AppsServices.deleteApp(deleteItemId);
    } else if (location.pathname.includes("apps")) {
      await AppsServices.deleteApp(deleteItemId);
    } else if (location.pathname.includes("movies")) {
      await MoviesServices.deleteMovie(deleteItemId);
    } else if (location.pathname.includes("books")) {
      await BooksServices.deleteBook(deleteItemId);
    }
    setDeleteItemId("");
    setDeleteDialogOpen(false);
    getData();
  };

  const handleDeleteClick = (dataId: string) => {
    setDeleteItemId(dataId);
    setDeleteDialogOpen(true);
  };

  const getData = async () => {
    let res: any[] = [];
    if (location.pathname.includes("games")) {
      res = await AppsServices.getGames();
    } else if (location.pathname.includes("apps")) {
      res = await AppsServices.getApps();
    } else if (location.pathname.includes("movies")) {
      res = await MoviesServices.getMovies();
    } else if (location.pathname.includes("books")) {
      res = await BooksServices.getBooks();
    }
    setData(res);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Box sx={styles.container}>
      <TableAdmin data={data} deleteItem={handleDeleteClick} />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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

export default Admin;
