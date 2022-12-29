import AddCircleIcon from "@mui/icons-material/AddCircle";
import DiscountIcon from "@mui/icons-material/Discount";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { newsApi } from "../../../../api";
import api from "../../../../configs/api.conf";
import { showType } from "../../../../utils/index";
import CreateNews from "../CreateNews";
import SkeletonNews from "../Skeleton";
import "./styles.scss";

News.propTypes = {};

function News(props) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const logged = useSelector((state) => state.auth.current);
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await newsApi.list();
        setNews(news);
      } catch (error) {
        enqueueSnackbar(
          "Có lỗi khi lấy dữ liệu, vui lòng kiểm tra lại server",
          { variant: "error" }
        );
      }
    };
    setLoading(false);
    fetchNews();
  }, [openDialogCreate]);

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
    </div>
  );
}

export default News;
