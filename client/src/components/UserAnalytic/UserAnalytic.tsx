import React, { useState, useEffect } from "react";
import { useSendData } from "../../helper/util";
import classes from "./UserAnalytic.module.css";
import sortImage from "../../assets/images/sort.png"

interface IAccessResource {
  title: string;
  access: number;
}

export default function UserAnalytics() {
  const [search, setSearch] = useState("");
  const [planName, setPlanName] = useState("");
  const [userAnalytics, setUserAnalytics] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const sendData = useSendData();

  async function fetchUserAnalytics() {
    try {
      let url = `user-analytics?page=${page}&limit=${limit}&keyword=${search}`;
      if (planName) {
        url += `&planName=${planName}`;
      }
      // if (updatedAt) {
      //     url += `&updatedAt=${updatedAt}`;
      // }

      const response = await sendData("GET", url, true);
      setUserAnalytics(response.userDetails);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserAnalytics();
  }, [page, limit, search, planName, updatedAt]);

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedAt(e.target.value);
  };

  const toggleSortOrder = () => {
    console.log("clicked")
    setSortAsc(prev => !prev);
    const sortedRecords = [...userAnalytics].sort((a, b) => {
      const dateA = new Date(a.updatedDate).getTime();
      const dateB = new Date(b.updatedDate).getTime();
      return sortAsc ? dateB - dateA : dateA - dateB;
    });
    setUserAnalytics(sortedRecords);
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
        <select
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        >
          <option value="">All Plans</option>
          <option value="Pro">Pro</option>
          <option value="Starter">Starter</option>
          <option value="Free">Free</option>
        </select>
        {/* <input
                    type="date"
                    value={updatedAt}
                    onChange={handleDateChange}
                /> */}
        <button type="submit">Search</button>
        {/* <div className="sort-button-container">
          <button onClick={toggleSortOrder} className="sort-button">
            <img src={sortImage} alt='sort' className='sort-img' />
          </button>
        </div> */}
      </form>
      <div className={classes.div}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User E-mail</th>
              <th>Subscription</th>
              <th>Total Number of resources</th>
              <th>Resources Left</th>
              <th>Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {userAnalytics.map((user) => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.planName}</td>
                <td>
                  {user.totalResources.map(
                    (resource: IAccessResource, index: number) => (
                      <p key={index}>
                        {resource.title}: {resource.access}
                      </p>
                    )
                  )}
                </td>
                <td>
                  {user.leftResources.map(
                    (resource: IAccessResource, index: number) => (
                      <p key={index}>
                        {resource.title}: {resource.access}
                      </p>
                    )
                  )}
                </td>
                <td>{user.updatedDate}</td> {/* Displaying updatedDate */}
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