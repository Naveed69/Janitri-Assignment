import { TextField, Button, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addInstallation,
  updateInstallation,
} from "../features/installations/installationsSlice";
import { v4 as uuidv4 } from "uuid";

const InstallationForm = ({ editing, clearEdit, closeForm }) => {
  const [form, setForm] = useState({
    deviceId: "",
    facility: "",
    date: "",
    technician: "",
  });
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ deviceId: "", facility: "", date: "", technician: "" });
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateInstallation(form));
      clearEdit();
    } else {
      dispatch(addInstallation({ ...form, id: uuidv4() }));
    }
    setForm({ deviceId: "", facility: "", date: "", technician: "" });
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <TextField
        label="Device"
        select
        value={form.deviceId} // Bind the value to form.deviceId
        onChange={(e) => setForm({ ...form, deviceId: e.target.value })}
        required
      >
        {devices.length === 0 ? (
          <MenuItem value="" disabled>
            No devices available
          </MenuItem>
        ) : (
          devices.map((device) => (
            <MenuItem key={device.id} value={device.id}>
              {device.name}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        label="Facility"
        value={form.facility}
        onChange={(e) => setForm({ ...form, facility: e.target.value })}
        required
      />

      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <TextField
        label="Technician"
        value={form.technician}
        onChange={(e) => setForm({ ...form, technician: e.target.value })}
        required
      />

      <Button type="submit" variant="contained">
        {editing ? "Update" : "Add"} Installation
      </Button>
    </form>
  );
};

export default InstallationForm;
