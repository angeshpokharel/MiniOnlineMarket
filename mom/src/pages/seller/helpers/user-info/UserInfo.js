import React, { useState, useEffect } from "react";
import { REQUIRED_FIELD, SOMETHING_WENT_WRONG } from "../../../../utils/constants";
import {useForm} from "react-hook-form";
import { Box, TextField, Button } from "@material-ui/core";
import styles from "../../Style";
import MOM, { API_URL } from "../../../../api/api";
import AddAlertMessage from "../../../../components/alert/Alert";

export default function UserInfo() {
  const { register, handleSubmit, errors } = useForm();
  const [defaultValues, setDefaultValues] = useState({});
  const [profileDataRetrieved, setProfileDataRetrieved] = useState(false);
  const classes = styles();

  useEffect(() => {
    drawUserProfile();
  }, []);

  const drawUserProfile = () => {
    MOM.get(API_URL.user)
      .then(response => {
        if (response.data !== null) {
          setDefaultValues(response.data);
          console.log(defaultValues)
          setProfileDataRetrieved(true);
        }
      })
      .catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      });
  };

  const onSubmit = data => {
    MOM.post(API_URL.profile, data)
      .then(response => {
        AddAlertMessage({
          type: response.data.type,
          message: response.data.message
        });
      })
      .catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      });
  };

  return (
    profileDataRetrieved && (
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2} display="flex">
            <TextField
              label="Email:"
              type="email"
              variant="outlined"
              name="userEmail"
              fullWidth
              inputRef={register}
              defaultValue={defaultValues.userEmail}
              disabled
            />
            <TextField
              label="Full Name:"
              type="text"
              variant="outlined"
              name="fullName"
              fullWidth
              inputRef={register({
                required: true
              })}
              defaultValue={defaultValues.fullName}
            />
            {errors.fullName && (
              <span className="error-message">{REQUIRED_FIELD}</span>
            )}
          </Box>
          <Box
            item="true"
            textAlign="right"
            borderTop={1}
            borderColor={"grey.500"}
            pt={2}
            className={classes.btnContainer}
          >
            <Button
              className={classes.resetBtn}
              variant="contained"
              color="secondary"
              type="reset"
            >
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    )
  );
}
