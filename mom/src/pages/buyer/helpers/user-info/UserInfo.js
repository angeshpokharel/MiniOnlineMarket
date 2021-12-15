import React, { useState, useEffect } from "react";
import { REQUIRED_FIELD, SOMETHING_WENT_WRONG, USER_ID } from "../../../../utils/constants";
import {useForm} from "react-hook-form";
import { Box, TextField, Button } from "@material-ui/core";
import styles from "../../Style";
import MOM, { API_URL } from "../../../../api/api";
import AddAlertMessage from "../../../../components/alert/Alert";
import { LocalStorage } from "../../../../utils/storage/localStorage";

export default function UserInfo() {
  const { register, handleSubmit, errors } = useForm();
  const [defaultValues, setDefaultValues] = useState({});
  const [profileDataRetrieved, setProfileDataRetrieved] = useState(false);
  const classes = styles();

  useEffect(() => {
    drawUserProfile();
  }, []);

  const drawUserProfile = () => {
    MOM.get(API_URL.user + "/" + LocalStorage.getItem(USER_ID))
      .then(response => {
          setDefaultValues(response.data);
          setProfileDataRetrieved(true);
      })
      .catch(error => {
        AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
      });
  };

  const onSubmit = data => {
    MOM.put(API_URL.user + "/" + LocalStorage.getItem(USER_ID) + "?name=" + data.name)
      .then(response => {
        AddAlertMessage({
          type: "success",
          message: "Name Updated Successfully"
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
              label="ईमेल:"
              type="email"
              variant="outlined"
              name="userEmail"
              fullWidth
              inputRef={register}
              defaultValue={defaultValues.email}
              disabled
            />
            <TextField
              label="पुरा नाम:"
              type="text"
              variant="outlined"
              name="name"
              fullWidth
              inputRef={register({
                required: true
              })}
              defaultValue={defaultValues.name}
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
              रद्द गर्नुहोस
            </Button>
            <Button variant="contained" color="primary" type="submit">
              सुरक्षित गर्नुहोस
            </Button>
          </Box>
        </form>
      </Box>
    )
  );
}
