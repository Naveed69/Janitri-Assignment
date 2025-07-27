import { useDispatch, useSelector } from "react-redux";
import { deleteDevice } from "../../features/devices/devicesSlice";
import { deleteDeviceAndContracts } from "../../features/devices/devicesSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeviceForm from "../../components/DeviceForm";
import { useState } from "react";
import styles from "./Devices.module.scss";

function Devices() {
  const devices = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteDevice(id));
    dispatch(deleteDeviceAndContracts(id));
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" gutterBottom>
        Device Inventory
      </Typography>

      <DeviceForm editing={editing} clearEdit={() => setEditing(null)} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Serial No</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.serial}</TableCell>
              <TableCell>{device.location}</TableCell>
              <TableCell>
                <Button onClick={() => setEditing(device)}>Edit</Button>
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
