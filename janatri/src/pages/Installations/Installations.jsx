import { useSelector, useDispatch } from "react-redux";
import { deleteInstallation } from "../../features/installations/installationsSlice";
import InstallationForm from "../../components/InstallationForm";
import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
} from "@mui/material";
import styles from "./Installations.module.scss";

function Installations() {
  const installations = useSelector((state) => state.installations);
  const devices = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  const getDeviceName = (id) => {
    const device = devices.find((d) => d.id === id);
    return device ? device.name : "Unknown";
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" gutterBottom>
        Installations
      </Typography>

      <InstallationForm editing={editing} clearEdit={() => setEditing(null)} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device</TableCell>
            <TableCell>Facility</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Technician</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {installations.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{getDeviceName(i.deviceId)}</TableCell>
              <TableCell>{i.facility}</TableCell>
              <TableCell>{i.date}</TableCell>
              <TableCell>{i.technician}</TableCell>
              <TableCell>
                <Button onClick={() => setEditing(i)}>Edit</Button>
                <Button
                  color="error"
                  onClick={() => dispatch(deleteInstallation(i.id))}
                >
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

export default Installations;
