import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import MOM, {API_URL} from "../../../api/api";
import logo from "../../../assets/img/gop.png";
import AddAlertMessage from "../../../components/alert/Alert";
import Spinner from "../../../components/loader/Loader";
// context
import {ENTER_VALID_EMAIL, REQUIRED_FIELD, SOMETHING_WENT_WRONG,} from "../../../utils/constants/index";
import styles from "./style";

export default function Register(props) {
    const classes = styles();
    const { register, handleSubmit, errors, reset } = useForm();
    const [role, setRole] = useState();

    const handleChange = (event) => {
        setRole(event.target.value);
    }

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        data.role = role;
        let url;
        if (!!data.id) {
            url = MOM.put(API_URL.user, data)
        } else{
            url = MOM.post(API_URL.user, data)
        }
            url.then((response) => {
                setIsLoading(false);
                let data = response.data;
                if (data.type === "success") {
                    reset();
                    AddAlertMessage({ type: data.type, message: data.message });
                    props.history.push("/");
                } else {
                    AddAlertMessage({ type: data.type, message: data.message });
                }
            })
            .catch((error) => {
                setIsLoading(false);
                AddAlertMessage({ type: "error", message: SOMETHING_WENT_WRONG });
            });
    };

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Box textAlign="center" my={3}>
                <img src={logo} alt="MOM Logo" width="124" />
                <Box fontSize="h5.fontSize"> MOM </Box>
                <Box component="small"> Mini Online Market </Box>
            </Box>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="name"
                                label="Name"
                                margin="normal"
                                variant="outlined"
                                name="name"
                                inputRef={register({
                                    required: true,
                                })}
                            />
                            {errors.name && (
                                <span className="error-message">{REQUIRED_FIELD}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="email"
                                margin="normal"
                                variant="outlined"
                                name="email"
                                inputRef={register({
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                })}
                            />
                            {errors.email && errors.email.type === "required" && (
                                <span className="error-message">{REQUIRED_FIELD}</span>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <span className="error-message">{ENTER_VALID_EMAIL}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="password"
                                label="password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                name="password"
                                inputRef={register({
                                    required: true,
                                })}
                            />
                            {errors.password && (
                                <span className="error-message">{REQUIRED_FIELD}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="address"
                                label="Address"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                name="address"
                                inputRef={register({
                                    required: true,
                                })}
                            />
                            {errors.address && (
                                <span className="error-message">{REQUIRED_FIELD}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                name="phone"
                                inputRef={register({
                                    required: true,
                                })}
                            />
                            {errors.phoneNumber && (
                                <span className="error-message">{REQUIRED_FIELD}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="ROLE_SELLER">SELLER</MenuItem>
                                    <MenuItem value="ROLE_BUYER">BUYER</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.phoneNumber && (
                                <span className="error-message">{REQUIRED_FIELD}</span>
                            )}
                        </Grid>
                        <Grid item xs={12} className={classes.loginBtnContainer}>
                            {isLoading ? (
                                <Spinner />
                            ) : (
                            <Button
                                endIcon={<ExitToAppIcon />}
                                size="large"
                                fullWidth
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Signup
                            </Button>
                                )}
                        </Grid>
                        <Grid item xs={12} className={classes.loginBtnContainer}>
                                <Button
                                    endIcon={<ExitToAppIcon />}
                                    size="large"
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    type="button"
                                    href={"/"}
                                >
                                   Go to Log In
                                </Button>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}
