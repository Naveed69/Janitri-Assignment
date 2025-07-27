// src/pages/Contracts/components/ContractForm.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addContract,
  updateContract,
} from "../../../features/contracts/contractsSlice";

const ContractForm = ({ editingId, setEditingId }) => {
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.contracts);
  const devices = useSelector((state) => state.devices);
  const editingContract = contracts.find((c) => c.id === editingId);

  const [form, setForm] = useState({
    deviceId: "",
    type: "AMC",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (editingContract) setForm(editingContract);
  }, [editingContract]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateContract({ ...form, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addContract(form));
    }
    setForm({ deviceId: "", type: "AMC", startDate: "", endDate: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Device"
            fullWidth
            value={form.deviceId}
            onChange={(e) => setForm({ ...form, deviceId: e.target.value })}
            required
          >
            {devices.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            select
            label="Type"
            fullWidth
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <MenuItem value="AMC">AMC</MenuItem>
            <MenuItem value="CMC">CMC</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            type="date"
            label="Start"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            type="date"
            label="End"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" type="submit" fullWidth>
            {editingId ? "Update" : "Add"} Contract
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContractForm;
