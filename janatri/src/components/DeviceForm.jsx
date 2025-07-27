import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDevice, updateDevice } from "../features/devices/devicesSlice";

const initial = {
  name: "",
  serial: "",
  type: "",
  facility: "",
  status: "Online",
  battery: "",
  lastServiceDate: "",
  amcStatus: "None",
};

const DeviceForm = ({ editing, clearEdit, closeForm }) => {
  const [device, setDevice] = useState(initial);
  const dispatch = useDispatch();

  useEffect(() => {
    setDevice(editing ? editing : initial);
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      dispatch(updateDevice(device));
      if (clearEdit) clearEdit();
    } else {
      dispatch(addDevice(device));
    }

    setDevice(initial);
    if (closeForm) closeForm();
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title={editing ? "Edit Device" : "Add Device"} />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="name"
                label="Name"
                value={device.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="serial"
                label="Serial No"
                value={device.serial}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="type"
                label="Type"
                value={device.type}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="facility"
                label="Facility"
                value={device.facility}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <TextField
                name="status"
                select
                label="Status"
                value={device.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <TextField
                name="battery"
                label="Battery %"
                type="number"
                value={device.battery}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextField
                name="lastServiceDate"
                label="Last Service Date"
                type="date"
                value={device.lastServiceDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                name="amcStatus"
                select
                label="AMC/CMC"
                value={device.amcStatus}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="AMC">AMC</MenuItem>
                <MenuItem value="CMC">CMC</MenuItem>
              </TextField>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              sx={{
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ height: { md: "100%" } }}
              >
                {editing ? "Update" : "Add"} Device
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeviceForm;
