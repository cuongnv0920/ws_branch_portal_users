import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { depositApi } from "api";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import "./styles.scss";

Deposit.propTypes = {};

function Deposit(props) {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const deposits = await depositApi.getAll();
        setDeposits(deposits);
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      fetchDeposits();
    }, 300);

    return () => clearTimeout(timer);
  }, [deposits]);

  return (
    <div className="deposit">
      <h3 className="deposit__title">Lãi suất tiền gửi</h3>
      <div className="deposit__notification notificationDeposit">
        <h5 className="notificationDeposit__content">
          <span>Ngày hiệu lực: </span>
          {deposits.map(
            (deposit, index) =>
              index === 0 && (
                <Moment format="DD/MM/YYYY">{deposit.effect}</Moment>
              )
          )}
        </h5>
      </div>
      <TableContainer sx={{ maxHeight: 570 }}>
        <Table stickyHeader className="deposit__table table">
          <TableHead className="table__head head">
            <TableRow className="head__row">
              <TableCell className="head__cell">
                Kỳ hạn<p>Term</p>
              </TableCell>
              <TableCell className="head__cell">
                VND<p>% Năm</p>
              </TableCell>
              <TableCell className="head__cell">
                USD<p>% Năm</p>
              </TableCell>
              <TableCell className="head__cell">
                Online<p>% Năm</p>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="table__body body">
            {deposits.map((deposit) => (
              <TableRow className="body__row">
                <TableCell component="th" scope="row" className="body__cell">
                  {deposit.term}
                </TableCell>
                <TableCell className="body__cell">{deposit.vnd}</TableCell>
                <TableCell className="body__cell">{deposit.usd}</TableCell>
                <TableCell className="body__cell">{deposit.online}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Deposit;
