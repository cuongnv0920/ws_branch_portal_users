import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { exchangeRateApi, marginApi } from "api";
import branch from "configs/branch.conf";
import location from "configs/location.conf";
import jsPDF from "jspdf";
import html2PDF from "jspdf-html2canvas";
import { useEffect, useRef, useState } from "react";
import logo from "../../../../images/logo-header.png";
import "./styles.scss";

ExportERList.propTypes = {};

function ExportERList(props) {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [margins, setMarrgins] = useState([]);
  const pdfRef = useRef(null);
  const date = new Date();

  const handleExportPDF = async () => {
    const page = pdfRef.current;
    const doc = new jsPDF("1", "px", "a4");
    await html2PDF(page, {
      useCORS: true,
      allowTaint: true,
      output: "tygia.pdf",
    }).then((canvas) => {
      doc.addImage(canvas.toDataURL("image/png"), "PNG", 5, 5, 500, 200);
    });
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const exchangeRates = await exchangeRateApi.getAll();
      setExchangeRates(exchangeRates);
    };

    const timer = setTimeout(() => {
      fetchExchangeRates();
    }, 300);

    return () => clearTimeout(timer);
  }, [exchangeRates]);

  useEffect(() => {
    const fetchMargins = async () => {
      const margins = await marginApi.getAll();
      setMarrgins(margins);
    };
    fetchMargins();
  }, []);

  const rows = exchangeRates.map(function (exchangeRate) {
    const margin = margins.filter(function (margin) {
      return exchangeRate.currency === margin.currency;
    })[0];

    return {
      ensign: exchangeRate.ensign,
      currency: exchangeRate?.currency,
      buyCash: exchangeRate?.buyCash - margin?.buyCash || 0,
      buyTransfer: exchangeRate?.buyTransfer - margin?.buyTransfer || 0,
      selling: exchangeRate?.selling + margin?.selling || 0,
      status: margin?.status,
    };
  });

  return (
    <Box className="exportER">
      <Breadcrumbs
        aria-label="breadcrumbs"
        className="exportER__breadcrumbs breadcrumbsExportER"
      >
        <Link underline="hover" color="inherit" href={location.userLocation}>
          Trang chủ
        </Link>
        <Link underline="hover" color="text.primary">
          Bảng tỷ giá ngoại tệ
        </Link>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9} sm={12}>
          <div ref={pdfRef} className="exportER__content contentExportER">
            <Grid container className="contentExportER__label labelExportER">
              <Grid item md={6} xs={12} sm={12} className="labelExportER__left">
                <div className="labelExportER__logo">
                  <img src={logo} alt="logo" />
                </div>
                <div className="labelExportER__text">
                  <h4>NGÂN HÀNG TMCP ĐẦU TƯ</h4>
                  <h4>VÀ PHÁT TRIỂN VIỆT NAM</h4>
                  <p>--------------------</p>
                  <h5>{branch.name}</h5>
                </div>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                sm={12}
                className="labelExportER__right"
              >
                <div className="labelExportER__text">
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

            <div style={{ padding: "0px 56px" }}>
              <div className="contentExportER__title">
                <h3>BẢNG TỶ GIÁ NGOẠI TỆ</h3>
                <h5>List of Foreign exchange rate</h5>
              </div>

              <div className="contentExportER__notification">
                <h5>{`Số: ......... / ${date.getFullYear()}`}</h5>
                {exchangeRates.map(
                  (exchangeRate, index) =>
                    index === 0 && (
                      <h5>{`Thời điểm thông báo: ${exchangeRate.notificationHourd} - Lần thông báo thứ: ${exchangeRate.notificationNumber}`}</h5>
                    )
                )}
              </div>

              <TableContainer component="Paper">
                <Table
                  size="small"
                  aria-label="simple table"
                  sx={{ border: 1, borderColor: "grey.500" }}
                  className="exportER__table table"
                >
                  <TableHead className="table__head headExportER">
                    <TableRow className="headExportER__row">
                      <TableCell
                        rowSpan={2}
                        sx={{
                          border: 1,
                          borderColor: "grey.500",
                        }}
                        className="headExportER__cell"
                      >
                        Mã ngoại tệ
                        <p>Currency</p>
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{
                          border: 1,
                          padding: "6px",
                          borderColor: "grey.500",
                        }}
                        className="headExportER__cell"
                      >
                        Giá mua
                        <p>Buying</p>
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        sx={{ border: 1, borderColor: "grey.500" }}
                        className="headExportER__cell"
                      >
                        Giá bán
                        <p>Selling</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={1}
                        sx={{
                          border: 1,
                          padding: "6px",
                          borderColor: "grey.500",
                        }}
                        className="headExportER__cell"
                      >
                        Tiền mặt
                        <p>Cash</p>
                      </TableCell>
                      <TableCell
                        colSpan={1}
                        sx={{
                          border: 1,
                          padding: "6px",
                          borderColor: "grey.500",
                        }}
                        className="headExportER__cell"
                      >
                        Chuyển khoản
                        <p>Transfering</p>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody className="table__body body">
                    {rows.map(
                      (row, _) =>
                        row.status === true && (
                          <TableRow key={row.currency} className="body__row">
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                border: 1,
                                padding: "4px 40px",
                                borderColor: "grey.500",
                                fontSize: "0.9rem",
                              }}
                            >
                              {row.currency}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                border: 1,
                                borderColor: "grey.500",
                                padding: "4px 40px",
                                width: "5rem",
                                fontSize: "0.9rem",
                              }}
                            >
                              {row.buyCash.toLocaleString()}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                border: 1,
                                borderColor: "grey.500",
                                padding: "4px 40px",
                                width: "5rem",
                                fontSize: "0.9rem",
                              }}
                            >
                              {row.buyTransfer.toLocaleString()}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                border: 1,
                                borderColor: "grey.500",
                                padding: "4px 40px",
                                fontSize: "0.9rem",
                              }}
                            >
                              {row.selling.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="contentExportER__notification">
                <h5>
                  <u>Lưu ý:</u> Bảng thông báo tỷ giá chỉ mang tính chất tham
                  khảo. Tỷ giá giao dịch phụ thuộc vào thời điểm giao dịch thực
                  tế tại Chi nhánh.
                </h5>
                <h5>
                  <u>Note:</u> The above exchange rates are subject to change
                  without prior notice.
                </h5>
                <div style={{ display: "flex" }}>
                  {exchangeRates.map(
                    (exchangeRate, index) =>
                      index === 0 && (
                        <h5
                          style={{ flexGrow: 1 }}
                        >{`- Tỷ giá trung tâm: ${exchangeRate.centerExchangeRate.toLocaleString()} USD/VND`}</h5>
                      )
                  )}
                  <h4>GIÁM ĐỐC</h4>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <div className="actionExportER">
            <div className="actionExportER__title">
              <h5>Hành động</h5>
            </div>

            <div className="actionExportER__content">
              <Button
                type="button"
                className="actionExportER__button"
                onClick={handleExportPDF}
              >
                Tải file PDF
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExportERList;
