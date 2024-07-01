import React, { useEffect, useState } from "react";
import { useSendData } from "../helper/utils";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Plans.module.css";
import toast from 'react-hot-toast';

interface IAccessResource{
  title: string,
  access: number,
}
export default function Plans() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const navigate = useNavigate();
  const sendData = useSendData();

  const fetchSubscriptions = async () => {
    try {
      const res = await sendData("GET", "manage-subscription", true);
      const data=res.planData;
      console.log(data);
      if (Array.isArray(data)) {
        setSubscriptions(data);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };
  useEffect(() => {

    fetchSubscriptions();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      const res = await sendData('DELETE', `manage-subscription/${id}`, true);
      const data=res.plans;
      console.log(data);
      await fetchSubscriptions();
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.container}>
      <Link to="/create" className={classes.link}><div className={classes.newPlan}>+ Create New Plan</div></Link>
      <h2 className={classes.h2}>Available Subscriptions :</h2>
      <div className={classes.cards}>
        {subscriptions.map((subscription) => (
          <div key={subscription._id} className={classes.card}>
            <div className={classes.header}>
              <h3>{subscription.name}</h3>
              <p className={classes.price}>Price of Plan: ${subscription.price} USD</p>
            </div>
            <div className="card-body">Duration of plan: {subscription.duration} months</div>
            <div>
              {subscription.resources === -1
                ? "Unlimited Resource Access"
                : `${subscription.resources} Resource Access`}
            </div>
            <p>Available Resources:</p>
            <div>
              {subscription.titles.map((resource:IAccessResource)=>`${resource.title}: ${resource.access}`).join(', ')}
            </div>
            <Link to={`/edit/${subscription._id}`} className={classes.link}>Edit</Link>
            <button onClick={() => deleteHandler(subscription._id)} className={classes.deleteButton}>Delete Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
