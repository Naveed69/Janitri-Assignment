import React from "react";
import ServiceVisitForm from "./components/ServiceVisitForm";
import ServiceVisitList from "./components/ServiceVisitList";
import styles from "./ServiceVisits.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

const ServiceVisits = () => {
  const [editingId, setEditingId] = useState(null);
  const visitToEdit = useSelector((state) =>
    state.serviceVisits.find((v) => v.id === editingId)
  );

  return (
    <div className={styles.container}>
      <h2>Service Visits</h2>
      <ServiceVisitForm
        editingVisit={visitToEdit}
        setEditingId={setEditingId}
      />
      <ServiceVisitList setEditingId={setEditingId} />
    </div>
  );
};

export default ServiceVisits;
