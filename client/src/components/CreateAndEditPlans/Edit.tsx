import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendData } from "../helper/utils";
import classes from "./Edit.module.css";

export default function EditForm() {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListOfPayment() {
      try {
        const resData = await sendData(
          "GET",
          `manage-subscription:${id}`,
          true
        );
        setName(resData.name);
        setDuration(resData.duration);
        setFeatures(resData.features);
        setPrice(resData.price);
      } catch (err) {
        console.log(err);
        window.alert(err);
      }
    }
    fetchListOfPayment();
  }, []);

  const editPlanHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        features: features,
        price: price,
        duration: duration,
      };
      const response = await sendData(
        "PUT",
        `manage-subscription${id}`,
        true,
        data
      );
      navigate("/subscription-plans");
    } catch (err) {
      console.log(err);
      window.alert(err);
    }
  };

  return (
    <div>
      <form onSubmit={editPlanHandler} className={classes.form}>
        <label>Name of Plan:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Number of resources:</label>
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
        <label>Price of Plan:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
        />
        <label>Duration:</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.valueAsNumber)}
        />
        <button>Edit Plan</button>
      </form>
    </div>
  );
}