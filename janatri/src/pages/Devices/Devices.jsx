import { useDispatch, useSelector } from "react-redux";
import {
  deleteDevice,
  deleteDeviceAndContracts,
} from "../../features/devices/devicesSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import DeviceForm from "../../components/DeviceForm";
import { useState } from "react";
import styles from "./Devices.module.scss";

function Devices() {
  const devices = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteDevice(id));
    dispatch(deleteDeviceAndContracts(id));
  };

  const handleEdit = (device) => {
    setEditing(device);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleClose = () => {
    setEditing(null);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" gutterBottom>
        Device Inventory
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        Add Device
      </Button>

      {/* Modal for Add/Edit Form */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? "Edit Device" : "Add Device"}</DialogTitle>
        <DialogContent>
          <DeviceForm
            editing={editing}
            clearEdit={() => setEditing(null)}
            closeForm={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Device Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Serial No</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Facility</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Battery %</TableCell>
            <TableCell>Last Service Date</TableCell>
            <TableCell>AMC/CMC Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.serial}</TableCell>
              <TableCell>{device.type}</TableCell>
              <TableCell>{device.facility}</TableCell>
              <TableCell>{device.status}</TableCell>
              <TableCell>{device.battery}</TableCell>
              <TableCell>{device.lastServiceDate}</TableCell>
              <TableCell>{device.amcStatus}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(device)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(device.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Devices;
