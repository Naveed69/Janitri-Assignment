// src/pages/Contracts/Contracts.jsx
import React, { useState } from "react";
import ContractForm from "./components/ContractForm";
import ContractList from "./components/ContractList";
import { Container, Typography } from "@mui/material";

const Contracts = () => {
  const [editingId, setEditingId] = useState(null);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AMC/CMC Contracts
      </Typography>
      <ContractForm editingId={editingId} setEditingId={setEditingId} />
      <ContractList setEditingId={setEditingId} />
    </Container>
  );
};

export default Contracts;
