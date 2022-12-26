import React from "react";
import PropTypes from "prop-types";
import AssignmentIcon from "@mui/icons-material/Assignment";
import logo from "../../../../images/logo-header.png";
import "./styles.scss";
import {
  Alert,
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Paper,
} from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import api from "../../../../configs/api.conf";
import useNewsDetail from "../../hooks/useNewsDetail";
import { useLocation } from "react-router-dom";

DetailNews.propTypes = {};

function DetailNews(props) {
  const { pathname } = useLocation();

  const { loading, news } = useNewsDetail(pathname);

  if (loading) {
    return (
      <Backdrop>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className="detail">
      <Breadcrumbs aria-label="breadcrumbs">
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="text.primary" href="/detail/:id">
          Tên danh mục
        </Link>
      </Breadcrumbs>

      <div className="detail__content content">
        <Grid container className="content__label label">
          <Grid item md={6} xs={12} sm={12} className="label__left">
            <div className="label__logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="label__text">
              <h4>NGÂN HÀNG TMCP ĐẦU TƯ</h4>
              <h4>VÀ PHÁT TRIỂN VIỆT NAM</h4>
              <h4>Chi nhánh Gia Lâm</h4>
            </div>
          </Grid>
          <Grid item md={6} xs={12} sm={12} className="lable__right">
            <div className="label__text">
              <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
              <h4>Độc lập - Tự do - Hạnh phúc</h4>
            </div>
          </Grid>
        </Grid>

        <div className="content__title">
          <h4>
            Thông báo CĐCS CN Quận 7 Sài Gòn V/v Phát động giải chạy Tết ấm cho
            người nghèo
          </h4>
        </div>

        <div className="content__text">Nội dung bài viết</div>

        <div className="content__command">
          <Alert
            severity="warning"
            iconMapping={{
              warning: <DiscountIcon />,
            }}
          >
            Nội dung chỉ đạo
          </Alert>
        </div>
      </div>

      <Divider flexItem />
      <div className="detail__notification notification">
        <>
          <p className="notification__content">
            <a href="/" className="featured-download">
              Download file
            </a>
          </p>
          <Divider orientation="vertical" flexItem />
        </>
        <>
          <p className="notification__content">
            <a href="/" className="featured-download">
              Download file
            </a>
          </p>
          <Divider orientation="vertical" flexItem />
        </>
      </div>
    </div>
  );
}

export default DetailNews;
