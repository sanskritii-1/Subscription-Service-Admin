import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSendData } from "../helper/utils";
import classes from "./Edit.module.css";
import toast from 'react-hot-toast';

export default function EditForm() {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [resources, setResources] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [features, setFeatures] = useState<string>("");
  const navigate = useNavigate();
  const sendData = useSendData();

  useEffect(() => {
    async function fetchListOfPayment() {
      try {
        const res = await sendData(
          "GET",
          `manage-subscription/${id}`,
          true
        );
        console.log("hii");
        const resData=res.plan;
        console.log(res);

        setName(resData.name);
        setDuration(resData.duration);
        setResources(resData.resources);
        setPrice(resData.price);
        setFeatures(resData.features);
      } catch (err) {
        console.log(err);
      }
    }
    fetchListOfPayment();
  }, []);

  const editPlanHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        resources: resources,
        price: price,
        duration: duration,
        features: features,
      };
      const response = await sendData(
        "PUT",
        `manage-subscription/${id}`,
        true,
        data
      );
      navigate("/subscription-plans");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className={classes.h1}>Edit the plan</h1>
      <form onSubmit={editPlanHandler} className={classes.form}>
        <label>Name of Plan:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Number of resources:</label>
        <input
          type="number"
          value={resources}
          onChange={(e) => setResources(e.target.valueAsNumber)}
          required
        />
        <label>Price of Plan:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
          required
        />
        <label>Duration:</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.valueAsNumber)}
          required
        />
        <label>Features(Optional):</label>
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
        
        <button className={classes.editButton}>Edit Plan</button>
      </form>
    </div>
  );
}
