import Login from "../screens/authentication/Login";
import Books from "../screens/books/Books";
import Games from "../screens/games/Games";
import Movies from "../screens/movies/Movies";
import Applications from "../screens/apps/Applications";
import Admin from "../screens/admin/Admin";
import ItemAddEdit from "../screens/addItem/ItemAddEdit";
import ItemDetails from "../screens/itemDetails/ItemDetails";

export interface RouteType {
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
    path: "/admin/store/:page",
    component: Admin,
    name: "Admin Page",
    protected: true,
  },
  {
    path: "/admin/:action/:page/:name?",
    component: ItemAddEdit,
    name: "Add Edit Item Page",
    protected: true,
  },
  {
    path: "/store/:page/view/:id",
    component: ItemDetails,
    name: "Item Details",
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
