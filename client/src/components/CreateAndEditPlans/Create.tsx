import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendData } from "../helper/utils";
import classes from "./Create.module.css";
import toast from "react-hot-toast";
import ResourcesModal from "./ResourcesModal";

interface CheckType {
  id: string;
  checkProperty: boolean;
}

export default function CreateForm() {
  const [name, setName] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [isChecked, setIsChecked] = useState<CheckType[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [resources, setResources] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any[]>([]);
  const sendData = useSendData();
  const navigate = useNavigate();

  const createPlanHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        features: features,
        price: price,
        duration: duration,
        resources: resources,
      };
      await sendData("POST", "manage-subscription", true, data);
      navigate("/subscription-plans");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setIsChecked((prev) => {
      const index = prev.findIndex((pr) => pr.id === id);
      if (index >= 0) {
        const updatedChecks = [...prev];
        updatedChecks[index] = {
          ...updatedChecks[index],
          checkProperty: !updatedChecks[index].checkProperty,
        };
        console.log("present");
        return updatedChecks;
      } else {
        const newCheck = { id, checkProperty: true };
        console.log("absent");
        return [...prev, newCheck];
      }
    });
    console.log(isChecked);
  };

  const openModal = async () => {
    setIsModalOpen(true);

    try {
      const token = localStorage.getItem("token");
      let headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:7001/api/get-resources`, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      if (data.code === 401) {
        toast.error("Unauthorized Access");
        return navigate("/login");
      }

      setModalContent(data.result.resources);
      if (!response.ok) {
        toast.error(data.error || "An error occurred");
        throw new Error(data.error || "An error occurred");
      }

      if (data.status === "ok" && data.result.message) {
        toast.success(data.result.message || "Operation successful");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className={classes.h1}>Create a new Plan</h1>
      <form onSubmit={createPlanHandler} className={classes.form}>
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0vh 0vw 2vh 0vw",
          }}
        >
          <div>
            <label>Add Resources:</label>
          </div>
          <div>
            <button
              type="button"
              style={{ margin: "0vh 0vw 0vh 2vw" }}
              onClick={openModal}
            >
              +
            </button>
          </div>
        </div>
        <ResourcesModal show={isModalOpen} onClose={closeModal}>
          <h2>Modal Title</h2>
          <ul style={{ listStyle: "none" }}>
            {modalContent.map((res) => (
              <li key={res._id}>
                <input
                  type="checkbox"
                  id={res._id}
                  name="myCheckbox"
                  checked={
                    isChecked.find((ch) => ch.id === res._id)?.checkProperty ||
                    false
                  }
                  onChange={(event) => handleCheckboxChange(event, res._id)}
                />
                {res.title}
              </li>
            ))}
          </ul>
          <button onClick={closeModal} type="button">
            Close
          </button>
        </ResourcesModal>
        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
}
