import DiscountIcon from "@mui/icons-material/Discount";
import {
  Alert,
  Backdrop,
  Box,
  Breadcrumbs,
  CircularProgress,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { commentApi } from "api";
import api from "configs/api.conf";
import branch from "configs/branch.conf";
import useNewsDetail from "features/Detail/hooks/useNewsDetail";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showFile } from "utils";
import logo from "../../../../images/logo-header.png";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentList from "../CommentList";
import Create from "../Create";
import "./styles.scss";
import Moment from "react-moment";

DetailNews.propTypes = {};

function DetailNews(props) {
  const [comments, setComments] = useState([]);
  const [refeshCommnetList, setRefeshCommnetList] = useState(0);
  const { pathname } = useLocation();
  const newsId = pathname.split("/").slice(3);
  const { loading, news } = useNewsDetail(pathname);
  const logged = useSelector((state) => state.auth.current);
  const isLogged = !!logged._id;
  const date = new Date(news.createdAt);

  const handleRefeshCommentList = () => {
    setRefeshCommnetList(refeshCommnetList + 1);
  };

  function showCreateFormComment() {
    if (isLogged && !news.blockComment) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await commentApi.getAll();
      setComments(comments);
    };
    fetchComments();
  }, [refeshCommnetList]);

  const commentList = comments
    .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))
    .filter((comment) => comment.news === newsId[0]);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="success" />
      </Backdrop>
    );
  }

  return (
    <Box className="detail">
      <Breadcrumbs aria-label="breadcrumbs">
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="text.primary">
          {news.category?.name}
        </Link>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9} sm={12}>
          <div className="detail__content contentDetail">
            <Grid container className="contentDetail__label labelDetail">
              <Grid item md={6} xs={12} sm={12} className="labelDetail__left">
                <div className="labelDetail__logo">
                  <img src={logo} alt="logo" />
                </div>
                <div className="labelDetail__text">
                  <h4>NGÂN HÀNG TMCP ĐẦU TƯ</h4>
                  <h4>VÀ PHÁT TRIỂN VIỆT NAM</h4>
                  <p>--------------------</p>
                  <h5>{branch.name}</h5>
                </div>
              </Grid>
              <Grid item md={6} xs={12} sm={12} className="labelDetail__right">
                <div className="labelDetail__text">
                  <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                  <h4>Độc lập - Tự do - Hạnh phúc</h4>
                  <p>--------------------</p>
                  <h5 style={{ fontStyle: "italic" }}>{`${
                    branch.location
                  }, ngày ${date.getDate()} tháng ${
                    date.getMonth() + 1
                  } năm ${date.getFullYear()}`}</h5>
                </div>
              </Grid>
            </Grid>

            <div className="contentDetail__title">
              <h4>{news.title}</h4>
            </div>

            <div className="contentDetail__text">
              {news.content ? parse(news.content) : ""}
            </div>

            {news.command && (
              <div className="contentDetail__command">
                <Alert
                  severity="warning"
                  iconMapping={{
                    warning: <DiscountIcon />,
                  }}
                  sx={{ fontSize: "0.9rem", fontStyle: "italic" }}
                >
                  {news.command}
                </Alert>
              </div>
            )}
          </div>

          <Divider flexItem />
          <div className="detail__notification notificationDetail">
            {news.file_1 && (
              <>
                <div className="notificationDetail__content">
                  <a href={`${api.URL}/${news.file_1}`} target="_blank">
                    <img
                      src={`${api.URL}/images/${
                        showFile(news.file_1).fileType
                      }.png`}
                      alt="file type icon"
                    />
                    <p>{showFile(news.file_1).fileName}</p>
                  </a>
                </div>
                <Divider orientation="vertical" flexItem />
              </>
            )}

            {news.file_2 && (
              <>
                <div className="notificationDetail__content">
                  <a href={`${api.URL}/${news.file_2}`} target="_blank">
                    <img
                      src={`${api.URL}/images/${
                        showFile(news.file_2).fileType
                      }.png`}
                      alt="file type icon"
                    />
                    <p>{showFile(news.file_2).fileName}</p>
                  </a>
                </div>
                <Divider orientation="vertical" flexItem />
              </>
            )}
          </div>

          <Divider flexItem />
          {showCreateFormComment() && (
            <div className="detail__comment commentDetail">
              <Create refeshCommnetList={handleRefeshCommentList} />
            </div>
          )}

          <Divider flexItem />
          <div className="detail__commentList CommentListDetail">
            <CommentList
              commentList={commentList}
              refeshCommnetList={handleRefeshCommentList}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={3} sm={12}>
          <div className="infoDetail">
            <div className="infoDetail__title">
              <h5>Thông tin văn bản</h5>
            </div>

            <List className="infoDetail__list">
              <ListItem className="infoDetail__listItem">
                <ListItemText
                  className="infoDetail__listItemText"
                  primary="Ngày văn bản:"
                />
                <ListItemText
                  className="infoDetail__listItemText"
                  primary={
                    <Moment format="DD/MM/YYYY">{news.createdAt}</Moment>
                  }
                />
              </ListItem>
              <ListItem className="infoDetail__listItem">
                <ListItemText
                  className="infoDetail__listItemText"
                  primary="Số văn bản:"
                />
                <ListItemText
                  className="infoDetail__listItemText"
                  primary={news.code}
                />
              </ListItem>
              <ListItem className="infoDetail__listItem">
                <ListItemText
                  className="infoDetail__listItemText"
                  primary="Lượt xem:"
                />
                <ListItemText
                  className="infoDetail__listItemText"
                  primary={news.view}
                />
              </ListItem>
              <ListItem className="infoDetail__listItem">
                <ListItemText
                  className="infoDetail__listItemText"
                  primary="Bình luận"
                />
                <ListItemText
                  className="infoDetail__listItemText"
                  primary={news.countComment}
                />
              </ListItem>
              <ListItem className="infoDetail__listItem">
                <ListItemText
                  className="infoDetail__listItemText"
                  primary="Đặc tính"
                />
                <ListItemText
                  className="infoDetail__listItemText"
                  primary={
                    <img
                      className="infoDetail__type"
                      src={`${api.URL}/${news.type}`}
                      alt="type"
                    />
                  }
                />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailNews;
