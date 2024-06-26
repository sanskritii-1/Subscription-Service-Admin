import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSendData } from "../helper/utils";
import classes from "../PlanAnalytics/PlanAnalytics.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const today = new Date();
const date = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const monthName = monthNames[month];

export default function PlanAnalytics() {
  const [planAnalytics, setPlanAnalytics] = useState<any[]>([]);
  const sendData = useSendData();

  useEffect(() => {
    async function fetchPlanAnalytics() {
      try {
        const response = await sendData("GET", "plan-analytics", true);
        setPlanAnalytics(response.planDetails);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPlanAnalytics();
  }, []);

  const userCounts = planAnalytics.map(plan => plan.subscribedUsersCount);
  const dailyCounts = planAnalytics.map(plan => plan.dailyCount);
  const monthlyCounts = planAnalytics.map(plan => plan.monthlyCount);
  const revenues = planAnalytics.map(plan => plan.monthlyRevenue);
  const planNames = planAnalytics.map(plan => plan.name);

  const userCountsData = {
    labels: planNames,
    datasets: [
      {
        label: 'Total Users Subscribed',
        data: userCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: `Users Subscribed Today (${date} ${monthName})`,
        data: dailyCounts,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: `Users Subscribed This Month (${monthName} ${year})`,
        data: monthlyCounts,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: planNames,
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: revenues,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
     <div className={classes.div}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Subscription</th>
            <th>Total number of users subscribed</th>
            <th>Total number of users subscribed today i.e {date} {monthName}</th>
            <th>Total number of users subscribed this month i.e {monthName} {year}</th>
            <th>Total Revenue for current month</th>
          </tr>
        </thead>
        <tbody>
          {planAnalytics && planAnalytics.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.subscribedUsersCount}</td>
              <td>{user.dailyCount}</td>
              <td>{user.monthlyCount}</td>
              <td>${user.monthlyRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <br/>

      <div className={classes.box}>
      <div>
        <h3>Comparison of User Subscriptions</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <Bar data={userCountsData} options={options} />
        </div>
      </div>

      <div>
        <h3>Comparison of Monthly Revenues</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <Bar data={revenueData} options={options} />
        </div>
      </div>
      </div>
    </div>
  );
}