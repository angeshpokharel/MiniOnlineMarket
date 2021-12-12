import { Box, Button, Container, TextField } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from "react";
import { useForm } from "react-hook-form";
import YOJANA, { API_URL } from "../../../api/api";
import AddAlertMessage from "../../../components/alert/Alert";
import { ENTER_VALID_EMAIL, REQUIRED_FIELD, SOMETHING_WENT_WRONG } from "../../../utils/constants/index";
import styles from "./style";

export default function ForgetPassword(props) {
  const classes = styles();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    YOJANA.post(API_URL.forgetPassword + "?email=" + data.emailAddress)
      .then(response => {
        AddAlertMessage({ type: response.data.type, message: response.data.message });
        if (response.data.type === "success") {
          props.history.push("/");
        }
      })
      .catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      });
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <h2 className="border-bottom-heading">Type your Email</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box item="true" xs={8}>
          <TextField
            fullWidth
            id="emailAddress"
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            name="emailAddress"
            inputRef={register({
              required: true,
              pattern: /\S+@\S+\.\S+/
            })}
          />
          {errors.emailAddress && errors.emailAddress.type === "required" && <span className="error-message">{REQUIRED_FIELD}</span>}
          {errors.emailAddress && errors.emailAddress.type === "pattern" && <span className="error-message">{ENTER_VALID_EMAIL}</span>}
        </Box>
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
