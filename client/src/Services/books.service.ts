import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { ResponseI } from "../models/response.model";
import { BookModel } from "../models/book.model";

async function getBooks(): Promise<BookModel[]> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.get(`${environment.devAPI}/books/getBooks`, {
    headers: headers,
  });

  return res.data.message;
}

async function deleteBook(bookId: string): Promise<ResponseI> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const data = { bookId };
  const res = await axios.post(`${environment.devAPI}/books/deleteBook`, data, {
    headers: headers,
  });
  return res.data.message;
}

const BooksServices = { getBooks, deleteBook };
export default BooksServices;
