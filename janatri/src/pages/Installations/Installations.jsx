import { useSelector, useDispatch } from "react-redux";
import {
  deleteInstallation,
  markInstallationComplete,
} from "../../features/installations/installationsSlice";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "./Installations.module.scss";
import MarkAsInstalledDialog from "./components/MarkAsInstalledDialog";

function Installations() {
  const installations = useSelector((state) => state.installations);
  const devices = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const getDeviceName = (id) => {
    const device = devices.find((d) => d.id === id);
    return device ? device.name : "Deleted Device";
  };

  const handleEdit = (record) => {
    setEditing(record);
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
  const [showDialog, setShowDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" gutterBottom>
        Installations
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        Add Installation
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editing ? "Edit Installation" : "Add Installation"}
        </DialogTitle>
        <DialogContent>
          <InstallationForm
            editing={editing}
            clearEdit={() => setEditing(null)}
            closeForm={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device</TableCell>
            <TableCell>Facility</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Technician</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Attachments</TableCell> {/* New column */}
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
                <span
                  style={{
                    color: i.status === "Completed" ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {i.status || "Pending"}
                </span>
              </TableCell>

              {/* Attachments Column */}
              <TableCell>
                {i.attachments?.length > 0 ? (
                  i.attachments.map((file, idx) => (
                    <div key={idx}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#1976d2",
                          textDecoration: "underline",
                        }}
                      >
                        {file.name}
                      </a>
                    </div>
                  ))
                ) : (
                  <span style={{ color: "#999" }}>No files</span>
                )}
              </TableCell>

              <TableCell>
                <Button onClick={() => handleEdit(i)}>Edit</Button>
                <Button
                  color="error"
                  onClick={() => dispatch(deleteInstallation(i.id))}
                >
                  Delete
                </Button>
                {i.status !== "Completed" && (
                  <Button
                    color="success"
                    onClick={() => {
                      setSelectedId(i.id);
                      setShowDialog(true);
                    }}
                  >
                    Mark Installed
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MarkAsInstalledDialog
        open={showDialog}
        onClose={() => {
          setSelectedId(null);
          setShowDialog(false);
        }}
        onSubmit={(files) => {
          dispatch(
            markInstallationComplete({ id: selectedId, attachments: files })
          );
          setSelectedId(null);
          setShowDialog(false);
        }}
      />
    </div>
  );
}

export default Installations;
