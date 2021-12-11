import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from "react";
import { useForm } from "react-hook-form";
import YOJANA, { API_URL } from "../../../api/api";
import AddAlertMessage from "../../../components/alert/Alert";
import { AppUtils } from "../../../utils/appUtils";
import { PASSWORD_DO_NOT_MATCHES, REQUIRED_FIELD, SOMETHING_WENT_WRONG } from "../../../utils/constants/index";
import styles from "./style";

export default function ResetPassword(props) {
  const classes = styles();
  const { register, watch, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    let token = AppUtils.getUrlParam("token");
    // TODO:  send password and confirm password as postdata(i.e., object)
    if (token) {
      data.resetToken = token;
      YOJANA.post(API_URL.resetPassword, data)
        .then(response => {
          AddAlertMessage({
            type: response.data.type,
            message: response.data.message
          });
          if (response.data.type === "success") {
            props.history.push("/");
          }
        })
        .catch(error => {
          AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
        });
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <h2 className="border-bottom-heading">Reset Your Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="outlined-user-password"
              label="Password:"
              type="password"
              margin="normal"
              variant="outlined"
              name="newPassword"
              inputRef={register({ required: true })}
            />
            {errors.password && <span className="error-message">{REQUIRED_FIELD}</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="outlined-user-confirm-password"
              label="Confirm Password:"
              type="password"
              margin="normal"
              variant="outlined"
              name="confirmPassword"
              inputRef={register({
                required: true,
                validate: value => value === watch("newPassword")
              })}
            />
            {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className="error-message">{REQUIRED_FIELD}</span>}
            {errors.confirmPassword && errors.confirmPassword.type === "validate" && <span className="error-message">{PASSWORD_DO_NOT_MATCHES} </span>}
          </Grid>
        </Grid>
        <Box item="true" textAlign="right" className={classes.btnContainer}>
          <Button mr={2}
            className={classes.resetBtn}
            variant="contained"
            color="secondary"
            type="reset"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>
      <Box textAlign="center" mt={5}>
        <Button
          color="primary"
          onClick={() => {
            props.history.push("/");
          }}
          className={classes.button}
          startIcon={<ArrowBackIcon />}
        >
          Back To Home
      </Button>
      </Box>
    </Container>
  );
}
