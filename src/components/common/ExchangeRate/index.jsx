import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./styles.scss";

ExchangeRate.propTypes = {};

export function ExchangeRate(props) {
  return (
    <div className="exchangeRate">
      <h3 className="exchangeRate__title">Tỷ giá ngoại tệ</h3>
      <h5 className="exchangeRate__notification">
        Thời điểm thông báo: 08:17 SA - 09/12/2022 - Lần thông báo thứ: 1
      </h5>

      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader size="small" className="exchangeRate__table table">
          <TableHead className="table__head head">
            <TableRow className="head__row">
              <TableCell className="head__cell">Mã ngoại tệ</TableCell>
              <TableCell className="head__cell">Mua tiền mặt</TableCell>
              <TableCell className="head__cell">Mua chuyển khoản</TableCell>
              <TableCell className="head__cell">Bán</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="table__body body">
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>

            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
            <TableRow className="body__row">
              <TableCell component="th" scope="row" className="body__cell">
                USD
              </TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
              <TableCell className="body__cell">123,456</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
