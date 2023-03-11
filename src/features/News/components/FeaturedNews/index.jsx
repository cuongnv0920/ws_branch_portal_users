import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import { newsApi } from "api";
import api from "configs/api.conf";
import { getEdit, removeGetEdit } from "features/News/newsClice";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { showType } from "utils";
import CreateFeaturedNews from "../CreateFeaturedNews";
import Delete from "../Delete";
import Edit from "../Edit";
import SkeletonNews from "../Skeleton";
import "./styles.scss";

FeaturedNews.propTypes = {};

function FeaturedNews(props) {
  const logged = useSelector((state) => state.auth.current);
  const category = useSelector((state) => state.news.filterCategory);
  const searchTerm = useSelector((state) => state.news.filterSearchTerm);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 5,
    count: 5,
    page: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 5,
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedAdmin = () => {
    return logged.role === "admin";
  };

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
  const handleOpenDialogEdit = async (event) => {
    try {
      const id = event.currentTarget.id;
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

  const handleOpenDialogDelete = async (event) => {
    try {
      const id = event.currentTarget.id;
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
    const fetchFeaturedNews = async () => {
      try {
        const { news, paginations } = await newsApi.getFeatured(filters);
        setFeaturedNews(news);
        setPagination(paginations);
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(false);
    fetchFeaturedNews();
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
        setTitle("Thông tin nổi bật");
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
    <div className="featuredNews">
      {loading ? (
        <SkeletonNews title="Thông tin nổi bật" length={3} />
      ) : (
        <>
          <div className="featuredNews__title title-news">
            <h4>
              <span>{title}</span>
              <span className="featuredNews__filterResult">
                {featuredNews.length}
              </span>
            </h4>
            {isLoggedAdmin() && (
              <Chip
                className="news__chip"
                label="Thêm bài viết"
                onClick={handleOpenDialogCreate}
                icon={
                  <AddToPhotosOutlinedIcon className="featuredNews__iconAdd" />
                }
              />
            )}
          </div>

          <div
            className="featuredNews__content content"
            id="featuredNews-conent"
          >
            {featuredNews.map((row, index) => (
              <div className="content__card">
                <div className="content__title">
                  <AssistantPhotoIcon
                    className="content__icon"
                    sx={{ color: "#f50057" }}
                  />
                  <a
                    href={`/news/detail/${row.id}`}
                    className="detail-featuredNews"
                    title={row.title}
                  >
                    {row.title}
                  </a>
                  {isLoggedAdmin() && (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ marginLeft: "8px" }}
                    >
                      <IconButton
                        id={row.id}
                        size="small"
                        title="Sửa bài viết"
                        className="notification__buttonAction"
                        onClick={handleOpenDialogEdit}
                      >
                        <EditIcon
                          sx={{ color: "#00a152", fontSize: "1rem" }}
                          fontSize="small"
                        />
                      </IconButton>

                      <IconButton
                        id={row.id}
                        size="small"
                        title="Xóa bài viết"
                        className="notification__buttonAction"
                        onClick={handleOpenDialogDelete}
                      >
                        <DeleteIcon
                          sx={{ color: "#f50057", fontSize: "1rem" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Stack>
                  )}
                </div>

                <div className="content__notification notification">
                  {row.code && (
                    <>
                      <p className="notification__content">
                        {`Văn bản số ${row.code}`}
                      </p>
                      <Divider orientation="vertical" flexItem />
                    </>
                  )}

                  <p className="notification__content">{`${row.view} Lượt xem`}</p>
                  <Divider orientation="vertical" flexItem />

                  <p className="notification__content">
                    {`${row.countComment} Bình luận`}
                  </p>
                  <Divider orientation="vertical" flexItem />

                  <p className="notification__content">
                    <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>
                  </p>

                  {showType(row.createdAt) === true && (
                    <>
                      <Divider orientation="vertical" flexItem />
                      <p className="notification__content">
                        <img
                          className="image-hot"
                          src={api.URL + "/" + row.type}
                          alt=""
                        />
                      </p>
                    </>
                  )}

                  <Divider orientation="vertical" flexItem />
                  <p className="notification__content"></p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Stack spacing={2} className="featuredNews__pagination">
        <Pagination
          count={pagination.count}
          variant="outlined"
          color="secondary"
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
          <CreateFeaturedNews closeDialog={handleCloseDialogCreate} />
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
  );
}

export default FeaturedNews;
