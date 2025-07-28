// src/pages/Contracts/Contracts.jsx
import React, { useState } from "react";
import { Container, Typography, Button, Modal, Box } from "@mui/material";
import ContractForm from "./components/ContractForm";
import ContractList from "./components/ContractList";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Contracts = () => {
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    setEditingId(null);
    setShowModal(true);
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    setShowModal(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AMC/CMC Contracts
      </Typography>

      <Button variant="contained" onClick={handleAddClick} sx={{ mb: 2 }}>
        Add New Contract
      </Button>

      <ContractList setEditingId={handleEditClick} />

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={modalStyle}>
          <ContractForm
            editingId={editingId}
            setEditingId={setEditingId}
            onClose={() => setShowModal(false)}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default Contracts;
