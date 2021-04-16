import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useContext } from "react";

import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Impot Component
import Navbar from "./Component/Navbar/Navbar";
import PrivateRoute from "./Component/PrivateRoute";
import PrivateRoutePartner from "./Component/PrivateRoutePartner";
// Import Pages
import LandingPage from "./Pages/LandingPage";
import DetailPage from "./Pages/DetailPage";
import UserProfile from "./Pages/Profile/UserProfile";
import PartnerProfile from "./Pages/Profile/PartnerProfile";
import EditProfileUser from "./Pages/Profile/EditProfileUser";
import EditProfilePartner from "./Pages/Profile/EditProfilePartner";
import AddProduct from "./Pages/AddProduct";
import Dashboard from "./Pages/Dashboard";
import CartPage from "./Pages/CartPage";
// Import Context
import { UserContext } from "./Contexts/userContext";
import { CartContextProvider } from "./Contexts/cartContext";

import { QueryClient, QueryClientProvider } from "react-query";
import { API, setAuthToken } from "./Config/api";

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <CartContextProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <PrivateRoute exact path="/detail/:id" component={DetailPage} />
              <PrivateRoute exact path="/cart" component={CartPage} />
              <PrivateRoute
                exact
                path="/profile-user"
                component={UserProfile}
              />
              <PrivateRoute
                exact
                path="/profile-partner"
                component={PartnerProfile}
              />
              <PrivateRoute
                exact
                path="/edit-user"
                component={EditProfileUser}
              />
              <PrivateRoute
                exact
                path="/edit-partner"
                component={EditProfilePartner}
              />
              <PrivateRoute exact path="/addproduct" component={AddProduct} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
