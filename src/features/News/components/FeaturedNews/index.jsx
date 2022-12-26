import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
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
import { useLocation, useNavigate } from "react-router-dom";
import { newsApi } from "../../../../api";
import api from "../../../../configs/api.conf";
import { showType } from "../../../../utils/index";
import CreateFeaturedNews from "../CreateFeaturedNews";
import SkeletonNews from "../Skeleton";
import PropTypes from "prop-types";
import "./styles.scss";

FeaturedNews.propTypes = {};

function FeaturedNews(props) {
  const [loading, setLoading] = useState(true);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [openDialogCreate, setOpenDialogCreate] = useState();
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

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const featuredNews = await newsApi.list();
        setFeaturedNews(featuredNews);
      } catch (error) {
        enqueueSnackbar(
          "Có lỗi khi lấy dữ liệu, vui lòng kiểm tra lại server",
          { variant: "error" }
        );
      }
    };
    setLoading(false);
    fetchFeaturedNews();
  }, [openDialogCreate]);

  return (
    <div className="featuredNews">
      {loading ? (
        <SkeletonNews title="Thông tin nổi bật" length={2} />
      ) : (
        <>
          <div className="featuredNews__title title-news">
            <h4>Thông tin nổi bật</h4>
            {isLoggedAdmin() && (
              <IconButton
                className="featuredNews__iconAdd"
                aria-label="Thêm bài viết"
                title="Thêm bài viết"
                onClick={handleOpenDialogCreate}
              >
                <AddCircleIcon />
              </IconButton>
            )}
          </div>

          <div
            className="featuredNews__content content"
            id="featuredNews-conent"
          >
            {featuredNews.map(
              (row, index) =>
                row.hot === true && (
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
                    </div>

                    <div className="content__notification notification">
                      {row.file_1 && (
                        <>
                          <p className="notification__content">
                            <a
                              className="featured-download"
                              href={api.URL + "/" + row?.file_1}
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
                              className="featured-download"
                              href={api.URL + "/" + row?.file_2}
                            >
                              Tải file
                            </a>
                          </p>
                          <Divider orientation="vertical" flexItem />
                        </>
                      )}

                      <p className="notification__content">
                        {`${row.view} người xem`}
                      </p>
                      <Divider orientation="vertical" flexItem />

                      <p className="notification__content">
                        <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>
                      </p>

                      {showType(row.createdAt) < 2 && (
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
    </div>
  );
}

export default FeaturedNews;
