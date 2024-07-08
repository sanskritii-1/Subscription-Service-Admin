import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendData } from "../helper/utils";
import styles from "./Create.module.css";
import classes from "./Create.module.css";
import ResourcesModal from "./ResourcesModal";

interface CheckType {
  id: string;
  access: number;
  checkProperty: boolean;
}

interface grpType{
  rId: string,
  access: number,
}

export default function CreateForm() {
  const [name, setName] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [isChecked, setIsChecked] = useState<CheckType[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  // const [resources, setResources] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any[]>([]);
  const sendData = useSendData();
  const navigate = useNavigate();

  const createPlanHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resarr: grpType[] = [];
    let resources = 0;
    for (let i = 0; i < isChecked.length; i++) {
      if (isChecked[i].checkProperty) {
        resources++;
        resarr.push({rId:isChecked[i].id, access: isChecked[i].access});
      }
    }
    try {
      const data = {
        name: name,
        features: features,
        price: price,
        duration: duration,
        resources: resources,
        resourceArray: resarr,
      };
      await sendData("POST", "manage-subscription", true, data);
      navigate("/subscription-plans");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (
    // event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    access: number,
  ) => {
    setIsChecked((prev) => {
      const index = prev.findIndex((pr) => pr.id === id);
      if (index >= 0) {
        const updatedChecks = [...prev];
        updatedChecks[index] = {
          ...updatedChecks[index],
          access: access,
          checkProperty: access>0,
          // checkProperty: !updatedChecks[index].checkProperty,
        };
        console.log("present");
        return updatedChecks;
      } else {
        const newCheck = { id, access, checkProperty: true };
        console.log("absent");
        return [...prev, newCheck];
      }
    });
    console.log(isChecked);
  };

  const openModal = async () => {
    setIsModalOpen(true);

    try {

      const response = await sendData("GET", 'get-resources', true);

      setModalContent(response.resources);
    }
    catch (err) {
      console.error(err);
      // throw err;
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
        {/* <label>Number of resources:</label>
        <input
          type="number"
          value={resources}
          onChange={(e) => setResources(e.target.valueAsNumber)}
          required
        /> */}
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
          <button onClick={closeModal} type="button" className={styles.closeButton}>
            X
          </button>
          {/* <ul style={{ listStyle: "none" }}> */}
          <div className={styles.imgContainer}>
          {modalContent.map((res) => (

              <div
                key={res._id}
                className={styles.card}
                onClick={() => handleCheckboxChange(res._id,1)}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isChecked.find((ch) => ch.id === res._id)?.checkProperty || false}
                  onChange={() => handleCheckboxChange(res._id,1)}
                />
                <h2 className={styles.title}>{res.title}</h2>
                <img className={styles.image} src={res.url} alt={res.title} />
                {/* <p className={styles.description}>{res.description}</p> */}
                <input 
                placeholder="Number of access" 
                type="number" 
                className={styles.accessNum}
                value={isChecked.find((ch) => ch.id === res._id)?.access || ''}
                onChange={(e) => handleCheckboxChange(res._id, parseInt(e.target.value))}                
                onClick={(e) => e.stopPropagation()}
                />
              </div>
          ))}
          </div>
          {/* </ul> */}
          <button onClick={closeModal} type="button">
            Add
          </button>
        </ResourcesModal>
        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
}
