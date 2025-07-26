import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDevice, updateDevice } from "../features/devices/devicesSlice";
import { v4 as uuidv4 } from "uuid";

const DeviceForm = ({ editing, clearEdit }) => {
  const [device, setDevice] = useState({ name: "", serial: "", location: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (editing) setDevice(editing);
    else setDevice({ name: "", serial: "", location: "" });
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateDevice(device));
      clearEdit();
    } else {
      dispatch(addDevice({ ...device, id: uuidv4() }));
    }
    setDevice({ name: "", serial: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <TextField
        label="Name"
        value={device.name}
        required
        onChange={(e) => setDevice({ ...device, name: e.target.value })}
      />
      <TextField
        label="Serial No"
        value={device.serial}
        required
        onChange={(e) => setDevice({ ...device, serial: e.target.value })}
      />
      <TextField
        label="Location"
        value={device.location}
        required
        onChange={(e) => setDevice({ ...device, location: e.target.value })}
      />
      <Button type="submit" variant="contained">
        {editing ? "Update" : "Add"} Device
      </Button>
    </form>
  );
};

export default DeviceForm;
