import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import { sendData } from '../helper/utils';

const UserWithCurrentPlan: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentPlans = async () => {
      try {
        const response = await sendData('GET', 'current-plan-details', true);
        setUserData(response);
      } catch (error) {
        setError('Error fetching current plans');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-panel">
      <h2>All Users with Their Current Plans</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Plan</th>
            <th>Remaining Days</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user: any) => (
            <tr key={user.userId}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.currentPlan.name}</td>
              <td>{user.currentPlan.remainingDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserWithCurrentPlan;

