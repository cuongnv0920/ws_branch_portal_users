import DiscountIcon from "@mui/icons-material/Discount";
import { Divider } from "@mui/material";
import React from "react";
import "./styles.scss";

FeaturedNews.propTypes = {};

function FeaturedNews(props) {
  return (
    <div className="featuredNews">
      <div className="featuredNews__title title-news">
        <h4>Thông tin nối bật</h4>
      </div>

      <div className="featuredNews__content content" id="featuredNews-conent">
        <div className="content__card">
          <div className="content__title">
            <DiscountIcon className="content__icon" sx={{ color: "#f50057" }} />
            <a href="/" className="content__detail detail-featuredNews">
              Thông báo V/v Phân cùng cụm địa bàn đối với các Chi nhánh trong hệ
              thống BIDV
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
            <DiscountIcon className="content__icon" sx={{ color: "#f50057" }} />
            <a href="/" className="content__detail detail-featuredNews">
              Thông báo V/v Phân cùng cụm địa bàn đối với các Chi nhánh trong hệ
              thống BIDV
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
            <DiscountIcon className="content__icon" sx={{ color: "#f50057" }} />
            <a href="/" className="content__detail detail-featuredNews">
              Thông báo V/v Phân cùng cụm địa bàn đối với các Chi nhánh trong hệ
              thống BIDV
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
            <DiscountIcon className="content__icon" sx={{ color: "#f50057" }} />
            <a href="/" className="content__detail detail-featuredNews">
              Thông báo V/v Phân cùng cụm địa bàn đối với các Chi nhánh trong hệ
              thống BIDV
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

export default FeaturedNews;
