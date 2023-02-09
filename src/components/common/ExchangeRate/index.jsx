import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { exchangeRateApi, marginApi } from "api";
import api from "configs/api.conf";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import Times from "../../../fonts/times.ttf";
import "./styles.scss";

ExchangeRate.propTypes = {};

export function ExchangeRate(props) {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [margins, setMarrgins] = useState([]);

  const handleExportPDF = async () => {
    const doc = new jsPDF("portrait", "pt", "a4");
    doc.addFont(Times, "Times", "normal");
    doc.setFont("Times");
    const data = await document.querySelector(".exchangeRate");
    doc.html(data).then(() => {
      doc.save("tygia.pdf");
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
    <div className="exchangeRate">
      <div className="exchangeRate__header">
        <h3 className="exchangeRate__title">Tỷ giá ngoại tệ</h3>
        <IconButton
          onClick={handleExportPDF}
          title="Xuất file PDF"
          className="exchangeRate__iconButton"
        >
          <FileDownloadIcon className="exchangeRate__icon" />
        </IconButton>
      </div>

      {exchangeRates.map(
        (exchangeRate, index) =>
          index === 0 && (
            <h5 className="exchangeRate__notification">
              {`(Thời điểm thông báo: ${exchangeRate.notificationHourd} - ${exchangeRate.notificationDate} - Lần thống báo thứ: ${exchangeRate.notificationNumber})`}
            </h5>
          )
      )}

      <TableContainer sx={{ maxHeight: 535 }}>
        <Table stickyHeader className="exchangeRate__table table">
          <TableHead className="table__head head">
            <TableRow className="head__row">
              <TableCell className="head__cell">
                Mã ngoại tệ<p>Currency</p>
              </TableCell>
              <TableCell className="head__cell">
                Mua TM<p>Buy cash</p>
              </TableCell>
              <TableCell className="head__cell">
                Mua CK<p>Buy transfer</p>
              </TableCell>
              <TableCell className="head__cell">
                Bán<p>Selling</p>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="table__body body">
            {rows.map(
              (row, _) =>
                row.status === true && (
                  <TableRow className="body__row">
                    <TableCell
                      component="th"
                      scope="row"
                      className="body__cell"
                    >
                      <div className="body__currency">
                        <img
                          src={api.URL + "/" + row.ensign}
                          alt="ensign"
                          className="body__ensign"
                        />
                        <div>{row.currency}</div>
                      </div>
                    </TableCell>
                    <TableCell className="body__cell">
                      {row.buyCash.toLocaleString()}
                    </TableCell>
                    <TableCell className="body__cell">
                      {row.buyTransfer.toLocaleString()}
                    </TableCell>
                    <TableCell className="body__cell">
                      {row.selling.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
