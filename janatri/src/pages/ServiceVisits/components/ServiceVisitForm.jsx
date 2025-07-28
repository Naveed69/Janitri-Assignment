import React, { useEffect, useState } from "react";
import styles from "./ServiceVisitForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceVisit,
  updateServiceVisit,
} from "../../../features/serviceVisits/serviceVisitsSlice";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const initialForm = {
  deviceId: "",
  technician: "",
  date: "",
  notes: "",
};

const ServiceVisitForm = ({ editingVisit, setEditingId, onClose }) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingVisit) {
      setForm(editingVisit);
    }
  }, [editingVisit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.deviceId || !form.technician || !form.date) return;

    if (editingVisit) {
      dispatch(updateServiceVisit(form));
      setEditingId(null);
    } else {
      dispatch(addServiceVisit({ ...form, id: Date.now() }));
    }
    setForm(initialForm);
    onClose();
  };

  const cancelEdit = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <Card className={styles.formCard}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {editingVisit ? "Edit Service Visit" : "Add Service Visit"}
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            select
            label="Device"
            name="deviceId"
            value={form.deviceId}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          >
            {devices.length > 0 ? (
              devices.map((device) => (
                <MenuItem key={device.id} value={device.id}>
                  {device.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                No devices available
              </MenuItem>
            )}
          </TextField>

          <TextField
            label="Technician"
            name="technician"
            value={form.technician}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />

          <div className={styles.buttonRow}>
            <Button type="submit" variant="contained" color="primary">
              {editingVisit ? "Update" : "Add"}
            </Button>
            {editingVisit && (
              <Button onClick={cancelEdit} variant="outlined" color="secondary">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceVisitForm;
