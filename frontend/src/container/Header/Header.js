import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>Mini Market- Seller Dashboard</h1>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName ={classes.active} to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink activeClassName ={classes.active} to="/orders">Orders</NavLink>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;