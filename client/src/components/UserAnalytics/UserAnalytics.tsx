import React, { useState, useEffect } from "react";
import { useSendData } from "../helper/utils";
import classes from "./UserAnalytics.module.css";

interface IAccessResource{
  title: string,
  access: number,
}
export default function UserAnalytics() {
  const [search, setSearch] = useState("");
  const [userAnalytics, setUserAnalytics] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const sendData = useSendData();

  async function fetchUserAnalytics() {
    try {
      const response = await sendData(
        "GET",
        `user-analytics?page=${page}&limit=${limit}&keyword=${search}`,
        true
      );
      setUserAnalytics(response.userDetails);
      console.log("in user anly ui: ", response)
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserAnalytics();
  }, [page, limit, search]);

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

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUserAnalytics();
  };

  return (
    <div>
      <form onSubmit={searchHandler} className={classes.form}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className={classes.div}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User E-mail</th>
              <th>Subscription</th>
              <th>Total Number of resources</th>
              {/* <th>Resources Accessed</th> */}
              <th>Resources Left</th>
              <th>Used Date</th>
            </tr>
          </thead>
          <tbody>
            {userAnalytics.map((user) => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.planName}</td>
                <td>{user.totalResources.map((resource:IAccessResource, index:number)=>
                  <p key={index}>{resource.title}: {resource.access}</p>
                )}</td>
                
                {/* <td>{user.accessedResources.map((resource:IAccessResource) =>
                  `${resource.title}: ${resource.access}`
                ).join(', ')}</td> */}
                <td>{user.leftResources.map((resource:IAccessResource, index:number) =>
                  <p key={index}>{resource.title}: {resource.access}</p>
                )}</td>
                <td>{user.updatedDate}</td>
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
