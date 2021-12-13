import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../Header/Header";

import Orders from "../Orders/Orders";
import Product from "../Product/Product";

import OrderDetails from "../../components/OrderDetails/OrderDetails"

const Home = () => {
    return (
        <div>
            <Header />
            <main>
                <Switch>

                    <Route path="/products">
                        <Product />
                    </Route>

                    {/* Go to this route the url is of exact match */}
                    <Route path="/orders" exact>
                        <Orders />
                    </Route>

                    <Route path="/orders/:orderId">
                        <OrderDetails />
                    </Route>

                    <Route path="/" exact>
                        <Redirect to="/products"/>
                    </Route>
                </Switch>
            </main>

        </div>
    );
}

export default Home;