import React, { useEffect, useState } from "react";
import { useSendData } from "../../helper/util";
import sortImage from "../../assets/images/sort.png";
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaCalendarAlt,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
  FaListAlt,
  FaDollarSign,
  FaCreditCard,
  FaHourglassHalf,
} from "react-icons/fa";
import classes from "./Styling.module.css";

interface Payment {
  id: string;
  userName: string;
  userEmail: string;
  planName: string;
  amount: number;
  date: string;
  status: string;
  paymentMethod: string;
}

const Info: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const sendData = useSendData();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await sendData("GET", "get-transactions", true);
        setPayments(response.paymentHistory);
        console.log(response.paymentHistory);
      } catch (error) {
        setError("Error fetching payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev);
    const sortedPayments = [...payments].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortAsc ? dateB - dateA : dateA - dateB;
    });
    setPayments(sortedPayments);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={classes.paymentTableContainer}>
      <h2>Transactions Made</h2>
      <div className={classes.sortButtonContainer}>
        <button onClick={toggleSortOrder} className={classes.sortButton}>
          <img src={sortImage} alt="sort" className={classes.sortImg} />
        </button>
      </div>
      <table className={classes.paymentTable}>
        <thead>
          <tr>
            <th>
              <FaIdBadge className={classes.icon} /> Transaction Id
            </th>
            <th>
              <FaUser className={classes.icon} /> User Name
            </th>
            <th>
              <FaEnvelope className={classes.icon} /> User Email
            </th>
            <th>
              <FaListAlt className={classes.icon} /> Plan Name
            </th>
            <th>
              <FaDollarSign className={classes.icon} /> Amount
            </th>
            <th>
              <FaCalendarAlt className={classes.icon} /> Date
            </th>
            <th>
              <FaCreditCard className={classes.icon} /> Payment Method
            </th>
            <th>
              <FaRegClock className={classes.icon} /> Status
            </th>
          </tr>
        </thead>
        <tbody>
          {payments &&
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.userName}</td>
                <td>{payment.userEmail}</td>
                <td>{payment.planName}</td>
                <td>{payment.amount}</td>
                <td>
                  {new Date(payment.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{payment.paymentMethod}</td>
                <td>
                  {payment.status === "succeeded" ? (
                    <FaCheckCircle
                    className={classes.icon} 
                      style={{ color: "green" }}
                    />
                  ) : payment.status === "failed" ? (
                    <FaTimesCircle className={classes.icon}  style={{ color: "red" }} />
                  ) : (
                    <FaHourglassHalf
                      className={classes.icon} 
                      style={{ color: "grey" }}
                    />
                  )}
                  {payment.status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
