import {
  Button,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { categoryApi, linkApi } from "../../../api";

MenuAppbar.propTypes = {};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  margin: "0px 5px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function MenuAppbar(props) {
  const [openCategoryMenu, setOpenCategoryMenu] = useState(null);
  const [openLinkMenu, setOpenLinkMenu] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [links, setLinks] = useState([]);

  const handleOpenCategoryMenu = (event) => {
    setOpenCategoryMenu(event.currentTarget);
  };
  const handleCloseCategoryMenu = () => {
    setOpenCategoryMenu(null);
  };
  const handleOpenLinkMenu = (event) => {
    setOpenLinkMenu(event.currentTarget);
  };
  const handleCloseLinkMenu = () => {
    setOpenLinkMenu(null);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const categorys = await categoryApi.list();
      setCategorys(categorys);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchLink = async () => {
      const links = await linkApi.list();
      setLinks(links);
    };
    fetchLink();
  }, []);

  return (
    <Box position="static" className="menu">
      <Container maxWidth="xl">
        <Toolbar variant="dense" className="menu__toolbar">
          <div className="menu__box">
            <Button className="menu__button">
              <a href="/">Trang chủ</a>
            </Button>

            <Divider orientation="vertical" variant="middle" flexItem />
            <Button
              aria-label="category"
              aria-controls="category"
              aria-haspopup="true"
              className="menu__button"
              endIcon={<KeyboardArrowDownIcon />}
              onMouseOver={handleOpenCategoryMenu}
            >
              Danh mục
            </Button>
            <Menu
              id="category"
              anchorEl={openCategoryMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                variant: "top",
                horizontal: "left",
              }}
              open={Boolean(openCategoryMenu)}
              onClose={handleCloseCategoryMenu}
            >
              {categorys.map((category, index) => (
                <MenuItem key={index}>{category.name}</MenuItem>
              ))}
            </Menu>

            <Divider orientation="vertical" flexItem variant="middle" />
            <Button
              aria-label="link"
              aria-controls="link"
              aria-haspopup="true"
              className="menu__button"
              endIcon={<KeyboardArrowDownIcon />}
              onMouseOver={handleOpenLinkMenu}
            >
              Liên kết
            </Button>
            <Menu
              id="link"
              anchorEl={openLinkMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                variant: "top",
                horizontal: "left",
              }}
              open={Boolean(openLinkMenu)}
              onClose={handleCloseLinkMenu}
            >
              {links.map((link, index) => (
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Link href={link.url} target="_blank">
                        {link.title}
                      </Link>
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}
            </Menu>

            <Divider orientation="vertical" flexItem variant="middle" />
            <Button className="menu__button">
              <li href="/">Danh bạ</li>
            </Button>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </Container>
    </Box>
  );
}
