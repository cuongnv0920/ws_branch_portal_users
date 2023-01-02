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
import { Route, Routes } from "react-router-dom";
import { ExchangeRate, Header, MenuAppbar } from "./components/common";
import Footer from "./components/common/Footer";
import Detail from "./features/Detail";
import News from "./features/News";

function App() {
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

      <Footer />

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
