import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import branch from "configs/branch.conf";
import { logout } from "features/Auth/authSlice";
import Login from "features/Auth/component/Login";
import Register from "features/Auth/component/Register";
import Setting from "features/Auth/component/Setting";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import logoHeader from "../../../images/logo-header.png";
import "./styles.scss";

Header.propTypes = {};

export function Header(props) {
  const logged = useSelector((state) => state.auth.current);
  const isLogged = !!logged._id;

  const [openAuth, setOpenAuth] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };
  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  const handleCloseSetting = () => {
    setOpenSetting(false);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);

    setOpenSetting(true);
  };
  const handleLogout = () => {
    const action = logout();
    dispatch(action);

    setAnchorEl(null);
  };

  return (
    <Box position="static" className="appbar">
      <Container maxWidth="xl">
        <Toolbar className="appbar__toolbar">
          <a href="/" className="appbar__link">
            <img src={logoHeader} alt="logo header" className="appbar__logo" />
          </a>

          <Typography className="appbar__title">
            {`NGÂN HÀNG TMCP ĐẦU TƯ VÀ PHÁT TRIỂN VIỆT NAM - ${branch.name}`}
          </Typography>

          {!isLogged && (
            <button onClick={handleOpenAuth} className="appbar__button">
              Đăng nhập
            </button>
          )}

          {isLogged && (
            <>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                title="User"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 0.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 12,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <Settings sx={{ color: "#00a152" }} fontSize="small" />
                  </ListItemIcon>
                  Cài đặt tài khoản
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout sx={{ color: "#f50057" }} fontSize="small" />
                  </ListItemIcon>
                  Thoát
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>

      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={openAuth}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseAuth(event, reason);
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
              <Login closeDialog={handleCloseAuth} />
            </TabPanel>
            <TabPanel>
              <Register closeDialog={handleCloseAuth} />
            </TabPanel>
          </Tabs>
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button className="dialogButtonCancel" onClick={handleCloseAuth}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={openSetting}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseSetting(event, reason);
          }
        }}
      >
        <DialogContent>
          <Setting closeDialog={handleCloseSetting} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button className="dialogButtonCancel" onClick={handleCloseSetting}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
