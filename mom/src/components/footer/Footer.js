import React from "react";
import { Container, Link, Box } from "@material-ui/core";
import styles from "./style";

export default function Footer(props) {
  const classes = styles();
  return (
    <Box className={classes.footer}>
      <Container maxWidth="sm">
        Copyright &copy;&nbsp;
      <Link href="https://miu.com/" target="_blank">
          Mini Online Market
      </Link>
        &nbsp;{new Date().getFullYear()}
      </Container>
    </Box>
  );
}
