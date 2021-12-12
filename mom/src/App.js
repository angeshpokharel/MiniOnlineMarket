import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactNotification from "react-notifications-component";
import {Router, Switch} from "react-router-dom";
import Footer from "./components/footer/Footer";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import ForgetPassword from "./pages/public/forget-password/ForgetPassword";
import Login from "./pages/public/login/Login";
import NotAuthorized from "./pages/public/not-authorized/NotAuthorized";
import GlobalPageNotFound from "./pages/public/not-found/GlobalPageNotFound";
import ResetPassword from "./pages/public/reset-password/ResetPassword";
import UserDashboard from "./pages/buyer/dashboard/Dashboard";
import Route from "./routes/Route";
import history from "./services/history";
import Register from "./pages/public/register/Register";
import BuyerDashboard from "./pages/buyer/dashboard/Dashboard";
import SellerDashboard from "./pages/seller/dashboard/Dashboard";

export default function App() {
  return (
    <>
      <ReactNotification />
      <Router history={history}>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
            <Route exact path="/reset" component={ResetPassword} />
            <Route
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
              isPrivate
            />
            <Route
              exact
              path="/page-not-found"
              component={GlobalPageNotFound}
              isWrongLink
            />
            <Route
              exact
              path="/user-not-authorized"
              component={NotAuthorized}
            />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route
              exact
              path="/buyer/dashboard"
              component={BuyerDashboard}
              isPrivate
            />
            <Route
              exact
              path="/seller/dashboard"
              component={SellerDashboard}
              isPrivate
            />
            
            <Route component={GlobalPageNotFound} isWrongLink />
          </Switch>
        </Layout>
      </Router>
      <Footer />
      <ScrollToTop />
    </>
  );
}
