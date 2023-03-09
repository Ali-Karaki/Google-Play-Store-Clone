import Login from "../screens/authentication/Login";
import Books from "../screens/books/Books";
import Games from "../screens/games/Games";
import Movies from "../screens/movies/Movies";
import Applications from "../screens/apps/Applications";

interface RouteType {
  path: string;
  component: () => JSX.Element;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "/store/games",
    component: Games,
    name: "Games Page",
    protected: true,
  },
  {
    path: "/store/apps",
    component: Applications,
    name: "Apps Page",
    protected: true,
  },
  {
    path: "/store/movies",
    component: Movies,
    name: "Movies Page",
    protected: true,
  },
  {
    path: "/store/books",
    component: Books,
    name: "Books Page",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Page",
    protected: false,
  },
  {
    path: "*",
    component: Games,
    name: "Games Page",
    protected: true,
  },
];

export default routes;
