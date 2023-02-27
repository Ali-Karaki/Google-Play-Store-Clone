import Login from "../screens/authentication/Login";
import Home from "../screens/home/Home";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: '',
    component: Home,
    name: 'Home Page',
    protected: true,
  },
  {
    path: '/login',
    component: Login,
    name: 'Login Page',
    protected: false,
  },
];

export default routes;
