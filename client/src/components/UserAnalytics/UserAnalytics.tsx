import React, { useState, useEffect } from "react";
import { useSendData } from "../helper/utils";
import classes from './UserAnalytics.module.css';

export default function UserAnalytics() {
  const [userAnalytics, setUserAnalytics] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const sendData = useSendData();

  useEffect(() => {
    async function fetchUserAnalytics() {
      try {
        const response = await sendData("GET", `user-analytics?page=${page}&limit=${limit}`, true);
        setUserAnalytics(response.userDetails);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserAnalytics();
  }, [page, limit]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
    <div className={classes.div}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User E-mail</th>
            <th>Subscription</th>
            <th>Number of resources Left</th>
            <th>Resources Accessed</th>
            <th>Resources Left</th>
          </tr>
        </thead>
        <tbody>
          {userAnalytics.map((user) => (
            <tr key={user.userId}>
              <td>{user.userName}</td>
              <td>{user.userEmail}</td>
              <td>{user.planName}</td>
              <td>{user.leftResources}</td>
              <td>{user.accessedResources}</td>
              <td>{user.leftResources}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className={classes.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
