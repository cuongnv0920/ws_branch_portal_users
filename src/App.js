import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import moment from "moment/moment";
import { ExchangeRate, Header, MenuAppbar } from "./components/common";
import { userApi } from "./api";
import News from "./features/News";
import Detail from "./features/Detail";

function App() {
  const [users, setUsers] = useState([]);
  const [openBirthday, setOpenBirthday] = useState(false);
  const today = new Date();

  const routes = [
    {
      path: "/*",
      element: <News />,
      role: "user",
    },
    {
      path: "/news/detail/:id",
      element: <Detail />,
      role: "user",
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userApi.list();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const birthday = users.filter((user, _) => user?.birthday);
  //   const date = new Date(birthday[0]?.birthday);
  //   console.log(date.getDate());
  //   console.log(date.getMonth() + 1);
  // });

  return (
    <div className="App">
      <Header />
      <Divider />
      <MenuAppbar />
      <Box className="main">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7} sm={12}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Grid>
            <Grid item xs={12} md={5} sm={12}>
              <Paper>
                <ExchangeRate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Dialog>
        <DialogContent>Nội dung</DialogContent>
        <DialogActions>
          <Button>Thoát</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
