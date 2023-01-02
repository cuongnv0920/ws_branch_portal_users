import React from "react";
import PropTypes from "prop-types";
import { Box, Container } from "@mui/system";
import { Grid } from "@mui/material";
import "./styles.scss";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item>footer</Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Footer;
