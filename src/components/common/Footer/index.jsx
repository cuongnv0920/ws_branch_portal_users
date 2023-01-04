import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import branch from "../../../configs/branch.conf";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import "./styles.scss";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item md={10} xs={12} sm={12}>
              <h2 className="footer__title">{`Ngân hàng TMCP Đầu tư và Phát triển Việt Nam - ${branch.name}`}</h2>
              <List className="footer__list listFooter">
                <ListItem className="listFooter__listItem">
                  <ListItemIcon className="listFooter__listIcon">
                    <IconButton className="listFooter__iconButton">
                      <AddLocationAltIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText
                    className="listFooter__listText"
                    primary={branch.address}
                  />
                </ListItem>
                <ListItem className="listFooter__listItem">
                  <ListItemIcon className="listFooter__listIcon">
                    <IconButton className="listFooter__iconButton">
                      <LocalPhoneIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText
                    className="listFooter__listText"
                    primary={branch.phone}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item md={2} xs={12} sm={12}>
              <h5 className="footer__copyright">Copyright © 2022</h5>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Footer;
