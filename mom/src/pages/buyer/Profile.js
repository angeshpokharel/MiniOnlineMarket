import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import React, { useState } from "react";
import {useForm} from "react-hook-form";
import AddAlertMessage from "../../components/alert/Alert";
import { useUserDispatch } from "../../context/UserContext";
import { AppUtils } from "../../utils/appUtils";
import { LOGOUT_SUCCESS, PASSWORD_DO_NOT_MATCHES, REQUIRED_FIELD, SOMETHING_WENT_WRONG } from "../../utils/constants";
import UserInfo from "./helpers/user-info/UserInfo";
import styles from "./Style";
import MOM, { API_URL } from "../../api/api";

export default function BuyerProfile(props) {
  const classes = styles();
  const { register, handleSubmit, errors, watch } = useForm();
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);
  var userDispatch = useUserDispatch();

  const closePasswordChangeModal = () => {
    setOpenPasswordChangeModal(false);
  };

  const submitPasswordChangeModal = data => {
    MOM.post(API_URL.changePassword, data)
      .then(response => {
        if (response.data.type === "success") {
          AppUtils.removeUserRef();
          userDispatch({ type: LOGOUT_SUCCESS });
          props.history.push("/");
        } else {
          AddAlertMessage({
            type: response.data.type,
            message: response.data.message
          });
        }
      })
      .catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      });
  };

  return (
    <Box className={classes.profilePage}>
      <Typography variant="h2" className="border-bottom-heading">
        Edit Profile
      </Typography>
      <Box pt={3}>
        <UserInfo />
      </Box>
    </Box>
  );
}
