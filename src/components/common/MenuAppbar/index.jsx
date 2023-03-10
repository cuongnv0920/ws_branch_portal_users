import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Divider,
  Link,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import { categoryApi, linkApi } from "api";
import location from "configs/location.conf";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterCategory,
  filterSearchTerm,
} from "../../../features/News/newsClice";
import "./styles.scss";

MenuAppbar.propTypes = {};

const Search = styled("form")(({ theme }) => ({
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
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimoutRef = useRef(null);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(null);
  const [openLinkMenu, setOpenLinkMenu] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [links, setLinks] = useState([]);

  const dispatch = useDispatch();

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
      const categorys = await categoryApi.getAll();
      setCategorys(categorys);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchLink = async () => {
      const links = await linkApi.getAll();
      setLinks(links);
    };
    fetchLink();
  }, []);

  const handleCategoryClick = async (category) => {
    setOpenCategoryMenu(null);
    const action = filterCategory({
      id: category.id,
      title: category.name,
    });
    await dispatch(action);
  };

  function handleSearchTermChange(event) {
    const value = event.target.value;
    setSearchTerm(value);

    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }

    typingTimoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      const action = filterSearchTerm({
        value: formValues,
        title: "K???t qu??? t??m ki???m",
      });
      dispatch(action);
    }, 300);
  }

  return (
    <Box position="static" className="menu">
      <Container maxWidth="xl">
        <Toolbar variant="dense" className="menu__toolbar">
          <div className="menu__box">
            <Button className="menu__button">
              <a href={location.userLocation}>Trang ch???</a>
            </Button>

            <Divider orientation="vertical" variant="middle" flexItem />
            <Button
              aria-label="category"
              aria-controls="category"
              aria-haspopup="true"
              className="menu__button"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleOpenCategoryMenu}
            >
              Danh m???c
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
              {categorys.map((category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Menu>

            <Divider orientation="vertical" flexItem variant="middle" />
            <Button
              aria-label="link"
              aria-controls="link"
              aria-haspopup="true"
              className="menu__button"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleOpenLinkMenu}
            >
              Li??n k???t
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
                <ListItem disablePadding>
                  <ListItemButton>
                    <Link href={link.url} target="_blank">
                      {link.name}
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </Menu>

            <Divider orientation="vertical" flexItem variant="middle" />
            <Button className="menu__button">
              <a href={`${location.userLocation}/contact`}>Danh b???</a>
            </Button>

            <Divider orientation="vertical" flexItem variant="middle" />
            <Button className="menu__button">
              <a href={location.adminLocation} rel="noreferrer" target="_blank">
                Qu???n tr???
              </a>
            </Button>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="T??m ki???m..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchTermChange}
              value={searchTerm}
            />
          </Search>
        </Toolbar>
      </Container>
    </Box>
  );
}
