import React, { useEffect, useState } from "react";
import { useSendData } from "../helper/utils";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Plans.module.css";

export default function Plans() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const navigate = useNavigate();
  const sendData = useSendData();
  
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await sendData("GET", "manage-subscription", false);
        if (Array.isArray(data)) {
          setSubscriptions(data);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const deleteHandler= async (id:string)=>{
    try {
        const response = await sendData('DELETE', 'manage-subscription', true, {planId:id});
        navigate('/subscription-plans');
      } 
      catch (err) {
        console.log(err);
        window.alert(err);
      }
  }

  return (
    <div className={classes.container}>
      <Link to="/create" className={classes.newPlan}>+ Create New Plan</Link>
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
            <Link to={`/edit/:${subscription._id}`} className={classes.link}>Edit</Link>
            <button onClick={()=>deleteHandler(subscription._id)} className={classes.deleteButton}>Delete Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
