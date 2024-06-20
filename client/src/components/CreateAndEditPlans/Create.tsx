import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendData } from "../helper/utils";
import classes from "./create.module.css";

export default function CreateForm() {
  const [name, setName] = useState<string>("");
  const [features, setfeatures] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const navigate = useNavigate();
  const createPlanHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        features: features,
        price: price,
        duration: duration,
      };
      const response = await sendData(
        "POST",
        "manage-subscription",
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
      <form onSubmit={createPlanHandler} className={classes.form}>
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
          onChange={(e) => setfeatures(e.target.value)}
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
        <button>Create Plan</button>
      </form>
    </div>
  );
}
