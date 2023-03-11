import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DiscountIcon from "@mui/icons-material/Discount";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Divider, IconButton, Stack } from "@mui/material";
import api from "configs/api.conf";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { showType } from "utils";
import "./styles.scss";

NewsList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,

  onClickOpenDialogCreate: PropTypes.func,
  onClickOpenDialogEdit: PropTypes.func,
  onClickOpenDialogDelete: PropTypes.func,
};

PropTypes.defaultProps = {
  data: [],
  title: "Thông tin chung",
};

function NewsList(props) {
  const {
    data,
    title,
    onClickOpenDialogCreate,
    onClickOpenDialogEdit,
    onClickOpenDialogDelete,
  } = props;
  const logged = useSelector((state) => state.auth.current);

  const isLoggedAdmin = () => {
    return logged.role === "admin";
  };

  return (
    <>
      <div className="news__title title-news">
        <h4>
          <span>{title}</span>
          <span className="featuredNews__filterResult">{data.length}</span>
        </h4>
        {isLoggedAdmin() && (
          <Chip
            className="news__chip"
            label="Thêm bài viết"
            onClick={onClickOpenDialogCreate}
            icon={<AddToPhotosOutlinedIcon className="news__iconAdd" />}
          />
        )}
      </div>
      <div className="news__content content">
        {data.map((news, _) => (
          <div className="content__card" key={news.id}>
            <div className="content__title">
              <DiscountIcon
                className="content__icon"
                sx={{ color: "#00a152" }}
              />
              <a
                href={`/news/detail/${news.id}`}
                className="detail-news"
                title={news.title}
              >
                {news.title}
              </a>
              {isLoggedAdmin() && (
                <Stack direction="row" spacing={1} sx={{ marginLeft: "8px" }}>
                  <IconButton
                    size="small"
                    title="Sửa bài viêt"
                    className="notification__buttonAction"
                    onClick={() => onClickOpenDialogEdit(news.id)}
                  >
                    <EditIcon
                      sx={{ color: "#00a152", fontSize: "1rem" }}
                      fontSize="small"
                    />
                  </IconButton>

                  <IconButton
                    size="small"
                    title="Xóa bài viết"
                    className="notification__buttonAction"
                    onClick={() => onClickOpenDialogDelete(news.id)}
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
              {news.code && (
                <>
                  <p className="notification__content">
                    {`Văn bản số: ${news.code}`}
                  </p>
                  <Divider orientation="vertical" flexItem />
                </>
              )}

              <p className="notification__content">{`${news.view} Lượt xem`}</p>
              <Divider orientation="vertical" flexItem />

              <p className="notification__content">
                {`${news.countComment} Bình luận`}
              </p>
              <Divider orientation="vertical" flexItem />

              <p className="notification__content">
                <Moment format="DD/MM/YYYY">{news.createdAt}</Moment>
              </p>
              {showType(news.createdAt) === true && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <p className="notification__content">
                    <img
                      className="image-hot"
                      src={api.URL + "/" + news.type}
                      alt="type"
                    />
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsList;
