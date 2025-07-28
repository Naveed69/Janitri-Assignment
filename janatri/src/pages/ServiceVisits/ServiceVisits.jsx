import React, { useState } from "react";
import ServiceVisitList from "./components/ServiceVisitList";
import styles from "./ServiceVisits.module.scss";
import { useSelector } from "react-redux";

const ServiceVisits = () => {
  const [editingId, setEditingId] = useState(null);
  const visitToEdit = useSelector((state) =>
    state.serviceVisits.find((v) => v.id === editingId)
  );

  return (
    <div className={styles.container}>
      <ServiceVisitList
        setEditingId={setEditingId}
        editingVisit={visitToEdit}
      />
    </div>
  );
};

export default ServiceVisits;
