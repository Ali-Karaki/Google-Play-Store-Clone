import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { Movie } from "../models/movie.model";

async function getBooks(): Promise<Movie[]> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.get(`${environment.devAPI}/books/getBooks`, {
    headers: headers,
  });

  return res.data.message;
}

const BooksServices = { getBooks };
export default BooksServices;
