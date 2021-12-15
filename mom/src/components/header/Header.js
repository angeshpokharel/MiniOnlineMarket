import {AppBar, Avatar, Box, IconButton, Link, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {ExitToApp as LogOutIcon, Menu as MenuIcon, Person} from "@material-ui/icons";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import MOM, {API_URL} from "../../api/api";
import logo from "../../assets/img/gop.png";
// context
import {toggleSidebar, useLayoutDispatch} from "../../context/LayoutContext";
import {useUserDispatch} from "../../context/UserContext";
import {AppUtils} from "../../utils/appUtils";
import {LOGOUT_SUCCESS} from "../../utils/constants";
import styles from "./style";
import AddAlertMessage from "../alert/Alert";
import {SOMETHING_WENT_WRONG, USER_ID} from "../../utils/constants/index";
import {LocalStorage} from "../../utils/storage/localStorage";

export default function Header(props) {
  const [userFullName, setUserFullName] = useState([]);
  const classes = styles();
  let history = useHistory();

  // global
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [profileMenu, setProfileMenu] = useState(null);

  const getUsername = () => {
    MOM.get(API_URL.user)
      .then(response => {
        console.log(response)
        setUserFullName(response.data.fullName);
      }).catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      })
  }

  useEffect(() => {
    getUsername();
  }, []);

  const logout = () => {
    MOM.get(API_URL.logout)
      .then(response => {
        let data = response.data;
        if (data.type === "success") {
          AppUtils.removeUserRef();
          userDispatch({ type: LOGOUT_SUCCESS });
          history.push("/");
        }
      })
      .catch(error => {
      });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <img src={logo} alt="Mini Online Market" width="36"></img>
        <Typography variant="h6" className={classes.brand}>
          Mini Online Market: Role : {AppUtils.getUserRole()}
        </Typography>
        <Box display="flex" className={classes.userProfileMenu} justifyContent="center" alignItems="center" onClick={e => setProfileMenu(e.currentTarget)}>
          <Typography variant="body1" className={classes.username}>
            {userFullName}
          </Typography>
          <Avatar alt="Avatar" src={logo} />
        </Box>
        <Menu anchorEl={profileMenu} open={Boolean(profileMenu)} onClose={() => setProfileMenu(null)} classes={{ paper: classes.profileMenu }} disableAutoFocusItem>
          <MenuItem className={classes.profileMenuItem}>
            <Link onClick={logout} variant="body1" className={classes.profileMenuLink}>
              <LogOutIcon className={classes.profileMenuIcon} />
              Logout
            </Link>
            <Link href="profile" variant="body1" className={classes.profileMenuLink}>
              <Person className={classes.profileMenuIcon} />
              Profile
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
