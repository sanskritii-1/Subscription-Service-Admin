import React, { useEffect, useState } from 'react';
import { useSendData } from '../../helper/util';
import './Styling.css';
import { FaUser, FaEnvelope, FaCalendarAlt, FaIdBadge } from 'react-icons/fa';

interface Payment {
  userName: string;
  userEmail: string;
  planName: string;
  endDate: string;
  startDate: string;
}

const CurrentPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sendData = useSendData();

  useEffect(() => {
    const fetchCurrentPlans = async () => {
      try {
        const response = await sendData('GET', 'get-payment-info', true);
        console.log(response);
        setPayments(response.paymentHistory);
      } catch (error) {
        setError('Error fetching current plans');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPlans();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const getCurrentPlansForUniqueEmails = () => {
    const currentDate = new Date();
    const uniqueEmails = Array.from(new Set(payments.map(payment => payment.userEmail)));
    const currentPlans = uniqueEmails.map(email => {
      const user = payments.find(payment => payment.userEmail === email);
      const plansForEmail = payments.filter(payment => payment.userEmail === email && new Date(payment.endDate) >= currentDate);

      // Sort plans by startDate and take the latest one
      const latestPlan = plansForEmail.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0];
      
      return { userName: user?.userName, userEmail: email, currentPlan: latestPlan?.planName || 'No current plans', startDate: latestPlan ? new Date(latestPlan.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'  };
    });
    return currentPlans;
  };
  const currentPlansForUniqueEmails = getCurrentPlansForUniqueEmails();

  return (
    <div className="table-container">
      <h2>Current Plans of Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th><FaIdBadge className="icon" />User</th>
            <th><FaUser className="icon" />User Name</th>
            <th><FaEnvelope className="icon" />User Email</th>
            <th><FaCalendarAlt className="icon" />Current Plans</th>
            <th><FaCalendarAlt className="icon" />Start Date</th>
          </tr>
        </thead>
        <tbody>
          {currentPlansForUniqueEmails.map((userData, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{userData.userName}</td>
              <td>{userData.userEmail}</td>
              <td>{userData.currentPlan}</td>
              <td>{userData.startDate}</td>
              {/* <td>{userData.currentPlans.length > 0 ? userData.currentPlans.join(', ') : 'No current plans'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentPage;
