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

  const [autoType, setAutoType] = useState(null); // to track whether type should be fixed (AMC/CMC) or editable

  useEffect(() => {
    if (editingContract) {
      setForm(editingContract);
      setAutoType(null); // allow editing existing contracts
    } else {
      setForm({
        deviceId: "",
        type: "AMC",
        startDate: "",
        endDate: "",
      });
      setAutoType(null);
    }
  }, [editingContract]);

  const handleDeviceChange = (deviceId) => {
    const selectedDevice = devices.find((d) => d.id === deviceId);

    if (selectedDevice) {
      const deviceContractType = selectedDevice.amcStatus; // expected: "AMC" or "CMC"

      if (deviceContractType === "AMC" || deviceContractType === "CMC") {
        setForm({
          ...form,
          deviceId,
          type: deviceContractType,
        });
        setAutoType(deviceContractType); // lock the type
      } else {
        setForm({ ...form, deviceId });
        setAutoType(null);
      }
    } else {
      setForm({ ...form, deviceId });
      setAutoType(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (editingId) {
      dispatch(updateContract({ ...payload, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addContract(payload));
    }

    setForm({
      deviceId: "",
      type: "AMC",
      startDate: "",
      endDate: "",
    });
    setAutoType(null);
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
            onChange={(e) => handleDeviceChange(e.target.value)}
            required
          >
            {devices.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Only show Type dropdown if autoType is null */}
        {!autoType && (
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
        )}

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
