import Login from "../screens/authentication/Login";
import Games from "../screens/games/Games";
import Movies from "../screens/movies/Movies";

interface RouteType {
  path: string;
  component: () => JSX.Element;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "/games",
    component: Games,
    name: "Games Page",
    protected: true,
  },
  {
    path: "/movies",
    component: Movies,
    name: "Movies Page",
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
