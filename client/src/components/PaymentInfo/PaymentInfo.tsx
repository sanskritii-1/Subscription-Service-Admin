import React, { useEffect, useState } from 'react';
import { sendData } from '../helper/utils';
import classes from './PaymentInfo.module.css';

interface Payment {
  id: string;
  userName: string;
  userEmail: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: string;
}

const PaymentInfo: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentPlans = async () => {
      try {
        // const response = await sendData('GET', 'get-payment-info', true);
        // if (response.status === 500) {
          setPayments([{
            id: 'default',
            userName: 'N/A',
            userEmail: 'N/A',
            planName: 'N/A',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            status: 'N/A'
          }]);
        // } else {
        //   setPayments(response);
        // }
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

  return (
    <div className={classes.container}>
      {payments.map(payment => (
        <div key={payment.id} className={classes.card}>
          <h2>Transaction Id: {payment.id}</h2>
          <p>User Name: {payment.userName}</p>
          <p>User Email: {payment.userEmail}</p>
          <p>Plan Name: {payment.planName}</p>
          <p>Start Date: {new Date(payment.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(payment.endDate).toLocaleDateString()}</p>
          <p>Status: {payment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentInfo;