import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { MovieModel } from "../models/movie.model";
import { ResponseI } from "../models/response.model";

async function getMovies(): Promise<MovieModel[]> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.get(`${environment.devAPI}/movies/getMovies`, {
    headers: headers,
  });

  return res.data.message;
}

async function createMovie(movie: MovieModel): Promise<ResponseI> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.post(
    `${environment.devAPI}/movies/createMovie`,
    movie,
    {
      headers: headers,
    }
  );
  return res.data;
}

async function editMovie(movie: MovieModel): Promise<ResponseI> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.put(`${environment.devAPI}/movies/editMovie`, movie, {
    headers: headers,
  });
  return res.data;
}

async function deleteMovie(movieId: string): Promise<ResponseI> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const data = { movieId };
  const res = await axios.post(
    `${environment.devAPI}/movies/deleteMovie`,
    data,
    {
      headers: headers,
    }
  );
  return res.data.message;
}
const MoviesServices = { getMovies, createMovie, editMovie, deleteMovie };
export default MoviesServices;
