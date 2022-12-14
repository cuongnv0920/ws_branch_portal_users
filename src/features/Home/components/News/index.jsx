import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "./styles.scss";
import { Divider } from "@mui/material";

News.propTypes = {};

function News(props) {
  return (
    <div className="news">
      <div className="news__title title-news">
        <h4>Thông báo chung</h4>
      </div>

      <div className="news__content content">
        <div className="content__card">
          <div className="content__title">
            <AssignmentIcon
              className="content__icon"
              sx={{ color: "#00a152" }}
            />
            <a href="/" className="content__detail detail-news">
              Thông báo tỷ giá lần 2
            </a>
          </div>

          <div className="content__notification notification">
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">11/12/2022</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">Hot</p>
          </div>
        </div>
        <div className="content__card">
          <div className="content__title">
            <AssignmentIcon
              className="content__icon"
              sx={{ color: "#00a152" }}
            />
            <a href="/" className="content__detail detail-news">
              Thông báo tỷ giá lần 2
            </a>
          </div>

          <div className="content__notification notification">
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">11/12/2022</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">Hot</p>
          </div>
        </div>
        <div className="content__card">
          <div className="content__title">
            <AssignmentIcon
              className="content__icon"
              sx={{ color: "#00a152" }}
            />
            <a href="/" className="content__detail detail-news">
              Thông báo tỷ giá lần 2
            </a>
          </div>

          <div className="content__notification notification">
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">11/12/2022</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">Hot</p>
          </div>
        </div>
        <div className="content__card">
          <div className="content__title">
            <AssignmentIcon
              className="content__icon"
              sx={{ color: "#00a152" }}
            />
            <a href="/" className="content__detail detail-news">
              Thông báo tỷ giá lần 2
            </a>
          </div>

          <div className="content__notification notification">
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">11/12/2022</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">Hot</p>
          </div>
        </div>
        <div className="content__card">
          <div className="content__title">
            <AssignmentIcon
              className="content__icon"
              sx={{ color: "#00a152" }}
            />
            <a href="/" className="content__detail detail-news">
              Thông báo tỷ giá lần 2
            </a>
          </div>

          <div className="content__notification notification">
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">File attach</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">11/12/2022</p>
            <Divider orientation="vertical" flexItem />
            <p className="notification__content">Hot</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
