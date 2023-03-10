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
          Trang ch???
        </Link>
        <Link underline="hover" color="text.primary">
          B???ng t??? gi?? ngo???i t???
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
                  <h4>NG??N H??NG TMCP ?????U T??</h4>
                  <h4>V?? PH??T TRI???N VI???T NAM</h4>
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
                  <h4>C???NG H??A X?? H???I CH??? NGH??A VI???T NAM</h4>
                  <h4>?????c l???p - T??? do - H???nh ph??c</h4>
                  <p>--------------------</p>
                  <h5 style={{ fontStyle: "italic" }}>{`${
                    branch.location
                  }, ng??y ${date.getDate()} th??ng ${
                    date.getMonth() + 1
                  } n??m ${date.getFullYear()}`}</h5>
                </div>
              </Grid>
            </Grid>

            <div style={{ padding: "0px 56px" }}>
              <div className="contentExportER__title">
                <h3>B???NG T??? GI?? NGO???I T???</h3>
                <h5>List of Foreign exchange rate</h5>
              </div>

              <div className="contentExportER__notification">
                <h5>{`S???: ......... / ${date.getFullYear()}`}</h5>
                {exchangeRates.map(
                  (exchangeRate, index) =>
                    index === 0 && (
                      <h5>{`Th???i ??i???m th??ng b??o: ${exchangeRate.notificationHourd} - L???n th??ng b??o th???: ${exchangeRate.notificationNumber}`}</h5>
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
                        M?? ngo???i t???
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
                        Gi?? mua
                        <p>Buying</p>
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        sx={{ border: 1, borderColor: "grey.500" }}
                        className="headExportER__cell"
                      >
                        Gi?? b??n
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
                        Ti???n m???t
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
                        Chuy???n kho???n
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
                  <u>L??u ??:</u> B???ng th??ng b??o t??? gi?? ch??? mang t??nh ch???t tham
                  kh???o. T??? gi?? giao d???ch ph??? thu???c v??o th???i ??i???m giao d???ch th???c
                  t??? t???i Chi nh??nh.
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
                        >{`- T??? gi?? trung t??m: ${exchangeRate.centerExchangeRate.toLocaleString()} USD/VND`}</h5>
                      )
                  )}
                  <h4>GI??M ?????C</h4>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <div className="actionExportER">
            <div className="actionExportER__title">
              <h5>H??nh ?????ng</h5>
            </div>

            <div className="actionExportER__content">
              <Button
                type="button"
                className="actionExportER__button"
                onClick={handleExportPDF}
              >
                T???i file PDF
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExportERList;
