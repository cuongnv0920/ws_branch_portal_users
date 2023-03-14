import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { exchangeRateApi, marginApi } from "api";
import api from "configs/api.conf";
import location from "configs/location.conf";
import { useEffect, useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import "./styles.scss";

ExchangeRate.propTypes = {};

export function ExchangeRate(props) {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [margins, setMarrgins] = useState([]);

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
        <Link
          href={`${location.userLocation}/exportER`}
          className="exchangeRate__link"
          title="Tạo bản in"
        >
          <PrintIcon />
        </Link>
      </div>

      <div className="exchangeRate__notification notificationExchangeRate">
        {exchangeRates.map(
          (exchangeRate, index) =>
            index === 0 && (
              <h5 className="notificationExchangeRate__content">
                {`(Thời điểm thông báo: ${exchangeRate.notificationHourd} - ${exchangeRate.notificationDate} - Lần thông báo thứ: ${exchangeRate.notificationNumber})`}
              </h5>
            )
        )}
      </div>

      <TableContainer sx={{ maxHeight: 570 }}>
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
