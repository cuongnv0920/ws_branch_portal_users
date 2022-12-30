import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DiscountIcon from "@mui/icons-material/Discount";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { newsApi } from "../../../../api";
import api from "../../../../configs/api.conf";
import { showType } from "../../../../utils";
import { getEdit, removeGetEdit } from "../../newsClice";
import CreateNews from "../CreateNews";
import Delete from "../Delete";
import Edit from "../Edit";
import SkeletonNews from "../Skeleton";
import "./styles.scss";

News.propTypes = {};

function News(props) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const logged = useSelector((state) => state.auth.current);

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
    const fetchNews = async () => {
      try {
        const news = await newsApi.list();
        setNews(news);
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(false);
    fetchNews();
  }, [openDialogCreate, openDialogEdit, openDialogDelete]);

  return (
    <div className="news">
      {loading ? (
        <SkeletonNews title="Thông tin chung" length={10} />
      ) : (
        <>
          <div className="news__title title-news">
            <h4>Thông báo chung</h4>
            {isLoggedAdmin() && (
              <IconButton
                className="news__iconAdd"
                onClick={handleOpenDialogCreate}
                aria-label="Thêm bài viết"
                title="Thêm bài viết"
              >
                <AddCircleIcon />
              </IconButton>
            )}
          </div>

          <div className="news__content content">
            {news.map(
              (row, index) =>
                row.hot === false && (
                  <div className="content__card">
                    <div className="content__title">
                      <DiscountIcon
                        className="content__icon"
                        sx={{ color: "#00a152" }}
                      />
                      <a
                        href={`/news/detail/${row.id}`}
                        className="detail-news"
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
                            title="Sửa"
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
                            title="Xóa"
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
                      {row.file_1 && (
                        <>
                          <p className="notification__content">
                            <a
                              className="news-download"
                              href={api.URL + "/" + row.file_1}
                            >
                              Tải file
                            </a>
                          </p>
                          <Divider orientation="vertical" flexItem />
                        </>
                      )}
                      {row.file_2 && (
                        <>
                          <p className="notification__content">
                            <a
                              className="news-download"
                              href={api.URL + "/" + row.file_2}
                            >
                              Tải file
                            </a>
                          </p>
                          <Divider orientation="vertical" flexItem />
                        </>
                      )}

                      {row.code && (
                        <>
                          <p className="notification__content">
                            {`Văn bản số: ${row.code}`}
                          </p>
                          <Divider orientation="vertical" flexItem />
                        </>
                      )}

                      <p className="notification__content">
                        {`${row.countComment} Bình luận`}
                      </p>
                      <Divider orientation="vertical" flexItem />

                      <p className="notification__content">
                        <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>
                      </p>
                      {showType(row.createdAt) <= 2 && (
                        <>
                          <Divider orientation="vertical" flexItem />
                          <p className="notification__content">
                            <img
                              className="image-hot"
                              src={api.URL + "/" + row.type}
                              alt="type"
                            />
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </>
      )}

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
        fullWidth="sm"
        maxWidth="sm"
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

export default News;
