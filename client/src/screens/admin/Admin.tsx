import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import AppsServices from "../../services/apps.service";
import TableAdmin from "../../components/table/Table";
import { TableProps } from "../../components/table/Table.types";
import { useLocation } from "react-router-dom";
import MoviesServices from "../../services/movies.service";
import BooksServices from "../../services/books.service";

const Admin = () => {
  const location = useLocation();

  const [data, setData] = useState<TableProps[]>([]);

  const getData = async () => {
    let res: TableProps[] = [];
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
      <TableAdmin data={data} />
    </Box>
  );
};

const styles = {
  container: {
    margin: "3% 7%",
    position: "relative",
    zIndex: 0,
  },
};

export default Admin;
