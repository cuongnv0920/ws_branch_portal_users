import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import { newsApi } from "api";
import { ExchangeRate } from "components/common";
import Deposit from "components/common/Deposit";
import { getEdit, removeGetEdit } from "features/News/newsClice";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNews from "../../components/CreateNews";
import Delete from "../../components/Delete";
import Edit from "../../components/Edit";
import FeaturedNews from "../../components/FeaturedNews";
import NewsList from "../../components/NewsList";
import SkeletonNews from "../../components/Skeleton";

News.propTypes = {};

function News(props) {
  const category = useSelector((state) => state.news.filterCategory);
  const searchTerm = useSelector((state) => state.news.filterSearchTerm);
  const [title, setTitle] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 8,
    count: 8,
    page: 1,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 8,
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenDialogCreate = () => {
    setOpenDialogCreate(true);
  };
  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
  };

  const handleCloseDialogEdit = () => {
    const action = removeGetEdit();
    dispatch(action);
    setOpenDialogEdit(false);

    const { refeshCommnetList } = props;
    if (refeshCommnetList) {
      refeshCommnetList();
    }
  };
  const handleOpenDialogEdit = async (id) => {
    try {
      const news = await newsApi.get(id);

      const action = getEdit(news);
      await dispatch(action);

      setOpenDialogEdit(true);
    } catch (error) {
      enqueueSnackbar("Lấy dữ liệu có lỗi, vui lòng liên hệ quản trị.", {
        variant: "error",
      });
    }
  };

  const handleOpenDialogDelete = async (id) => {
    try {
      const news = await newsApi.get(id);
      const action = getEdit(news);
      await dispatch(action);

      setOpenDialogDelete(true);
    } catch (error) {
      enqueueSnackbar("Lấy dữ liệu có lỗi, vui lòng liên hệ quản trị.", {
        variant: "error",
      });
    }
  };
  const handleCloseDialogDelete = () => {
    const action = removeGetEdit();
    dispatch(action);
    setOpenDialogDelete(false);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { news, paginations } = await newsApi.getAll(filters);
        setNews(news);
        setPagination(paginations);
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(false);
    fetchNews();
  }, [filters, openDialogCreate, openDialogEdit, openDialogDelete]);

  const handlePageChande = (event, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  useEffect(() => {
    const fetchCategory = async () => {
      await setFilters((prevFilters) => ({
        ...prevFilters,
        _category: category.id,
      }));

      if (!!category.title) {
        setTitle(category.title);
      } else {
        setTitle("Thông tin chung");
      }
    };
    const timer = setTimeout(() => {
      fetchCategory();
    }, 200);

    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    const fetchSearchTerm = async () => {
      await setFilters((prevFilters) => ({
        ...prevFilters,
        _search: searchTerm.value?.searchTerm,
      }));

      if (!!searchTerm?.title) {
        setTitle(searchTerm.title);
      }
    };

    const timer = setTimeout(() => {
      fetchSearchTerm();
    }, 200);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} sm={12}>
          {/* Thông tin nổi bật */}
          <FeaturedNews />

          {/* Thông tin chung */}
          <div className="news">
            {loading ? (
              <SkeletonNews title="Thông tin chung" length={8} />
            ) : (
              <>
                <NewsList
                  title={title}
                  data={news}
                  onClickOpenDialogCreate={handleOpenDialogCreate}
                  onClickOpenDialogEdit={handleOpenDialogEdit}
                  onClickOpenDialogDelete={handleOpenDialogDelete}
                />
              </>
            )}

            <Stack spacing={2} className="news__pagination">
              <Pagination
                count={pagination.count}
                variant="outlined"
                color="primary"
                page={pagination.page}
                onChange={handlePageChande}
              />
            </Stack>

            <Dialog
              fullWidth="md"
              maxWidth="md"
              open={openDialogCreate}
              onClose={(event, reason) => {
                if (reason !== "backdropClick") {
                  handleCloseDialogCreate(event, reason);
                }
              }}
            >
              <DialogContent>
                <CreateNews closeDialog={handleCloseDialogCreate} />
              </DialogContent>
              <DialogActions className="dialogAction">
                <Button
                  className="dialogButtonCancel"
                  onClick={handleCloseDialogCreate}
                >
                  Thoát
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              fullWidth="md"
              maxWidth="md"
              open={openDialogEdit}
              onClose={(event, reason) => {
                if (reason !== "backdropClick") {
                  handleCloseDialogEdit(event, reason);
                }
              }}
            >
              <DialogContent>
                <Edit closeDialog={handleCloseDialogEdit} />
              </DialogContent>
              <DialogActions className="dialogAction">
                <Button
                  className="dialogButtonCancel"
                  onClick={handleCloseDialogEdit}
                >
                  Thoát
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              maxWidth="lg"
              open={openDialogDelete}
              onClose={(event, reason) => {
                if (reason !== "backdropClick") {
                  handleCloseDialogDelete(event, reason);
                }
              }}
            >
              <DialogContent>
                <Delete closeDialog={handleCloseDialogDelete} />
              </DialogContent>
              <DialogActions className="dialogAction">
                <Button
                  className="dialogButtonCancel"
                  onClick={handleCloseDialogDelete}
                >
                  Thoát
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>

        <Grid item xs={12} md={5} sm={12}>
          <Paper>
            <ExchangeRate />
          </Paper>
          <Paper sx={{ marginTop: "35px" }}>
            <Deposit />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default News;
