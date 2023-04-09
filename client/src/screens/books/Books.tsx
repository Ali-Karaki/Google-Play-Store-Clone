import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import BooksServices from "../../services/books.service";
import Typography from "@mui/material/Typography";
import CarouselComponent, {
  CarouselData,
} from "../../components/carousel/Carousel";
import { useLocation } from "react-router-dom";
import { BookModel } from "../../models/book.model";

const Books = () => {
  const location = useLocation();

  const [books, setBooks] = useState<BookModel[]>([]);

  const getBooks = async () => {
    const resBooks: BookModel[] = await BooksServices.getBooks();
    setBooks(resBooks);
  };

  const getFilteredBooks = (section: string): CarouselData[] => {
    let filteredBooks = books;
    if (window.location.href.includes("?")) {
      const filter = window.location.href.split("?")[1];
      const [filterKey, filterValue] = filter.split("=");
      filteredBooks = filteredBooks.filter((book: any) => {
        return book[filterKey].toLowerCase() === filterValue.toLowerCase();
      });
    }
    if (section !== "") {
      filteredBooks = filteredBooks.filter((book: any) => {
        return book["category"].toLowerCase() === section.toLowerCase();
      });
    }

    return filteredBooks.map((item: BookModel) => ({
      id: item._id!,
      name: item.name,
      logo: item.logo,
      stars: item.stars,
    }));
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    getFilteredBooks("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const sections = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
  ];

  return (
    <Box sx={styles.container}>
      {sections.map((section: string) =>
        getFilteredBooks(section).length > 0 ? (
          <Box key={section} sx={styles.row}>
            <Typography textTransform="none" sx={styles.sectionTitle}>
              {section}
            </Typography>
            <CarouselComponent data={getFilteredBooks(section)} />
          </Box>
        ) : (
          <></>
        )
      )}
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

export default Books;
