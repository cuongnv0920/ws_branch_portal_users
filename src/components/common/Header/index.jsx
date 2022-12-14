import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Login from "../../../features/Auth/component/Login";
import Register from "../../../features/Auth/component/Register";
import logoHeader from "../../../images/logo-header.png";
import "./styles.scss";

Header.propTypes = {};

export function Header(props) {
  const [openAuth, setOpenAth] = useState(false);

  const handleOpenAth = () => {
    setOpenAth(true);
  };
  const handleCloseAth = () => {
    setOpenAth(false);
  };

  return (
    <Box position="static" className="appbar">
      <Container maxWidth="xl">
        <Toolbar className="appbar__toolbar">
          <a href="/" className="appbar__link">
            <img src={logoHeader} alt="logo header" className="appbar__logo" />
          </a>

          <Typography className="appbar__title">
            NGÂN HÀNG TMCP ĐẦU TƯ VÀ PHÁT TRIỂN VIỆT NAM - CHI NHÁNH GIA LÂM
          </Typography>

          <button onClick={handleOpenAth} className="appbar__button">
            Đăng nhập
          </button>
        </Toolbar>
      </Container>

      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={openAuth}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseAth(event, reason);
          }
        }}
      >
        <DialogContent>
          <Tabs>
            <TabList>
              <Tab>Đăng nhập</Tab>
              <Tab>Đăng ký</Tab>
            </TabList>

            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register closeDialog={handleCloseAth} />
            </TabPanel>
          </Tabs>
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button className="dialogButtonCancel" onClick={handleCloseAth}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
