import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactNotification from "react-notifications-component";
import { Router, Switch, Redirect } from "react-router-dom";
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
import Product from "./pages/seller/component/Product/Product";
import Orders from "./pages/seller/component/OrdersList/OrderList";
import OrderDetails from "./pages/seller/component/OrderDetails/OrderDetails";
import Order from "./pages/seller/component/Order/Order";

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
            <Route
              exact
              path="/seller/dashboard/products"
              component={Product}
              isPrivate />


            <Route
              exact
              path="/seller/dashboard/orders"
              component={Orders}
              isPrivate />


            <Route
              exact
              path="/seller/dashboard/orders/:orderId"
              component={OrderDetails}
              isPrivate
            />

            <Route path="/" exact isPrivate>
              <Redirect to="/products" />
            </Route>

            <Route component={GlobalPageNotFound} isWrongLink />
          </Switch>
        </Layout>
      </Router>
      <Footer />
      <ScrollToTop />
    </>
  );
}
