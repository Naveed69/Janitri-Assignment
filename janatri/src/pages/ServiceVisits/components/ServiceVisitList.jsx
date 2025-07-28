import React, { useState } from "react";
import styles from "./ServiceVisitList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteServiceVisit,
  markServiceDone,
} from "../../../features/serviceVisits/serviceVisitsSlice";
import MarkAsDoneDialog from "./MarkAsDoneDialog";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ServiceVisitForm from "./ServiceVisitForm"; // <-- make sure this is your form component

const ServiceVisitList = ({ setEditingId }) => {
  const dispatch = useDispatch();
  const visits = useSelector((state) => state.serviceVisits);
  const devices = useSelector((state) => state.devices);

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setEditingId(null); // for add new
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const getDeviceName = (id) => {
    const device = devices.find((d) => d.id === id);
    return device.name;
  };

  const [markingId, setMarkingId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Service Visits
        </Typography>
        <Button variant="contained" onClick={handleOpenModal}>
          Add New
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device</TableCell>
            <TableCell>Technician</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>Attachments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell>{getDeviceName(visit.deviceId)}</TableCell>
              <TableCell>{visit.technician}</TableCell>
              <TableCell>{visit.date}</TableCell>
              <TableCell>{visit.notes || "-"}</TableCell>
              <TableCell>
                <span
                  style={{
                    color: visit.status === "done" ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {visit.status === "done" ? "✅ Completed" : "⏳ Pending"}
                </span>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    setEditingId(visit.id);
                    setOpen(true);
                  }}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => dispatch(deleteServiceVisit(visit.id))}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                {visit.status !== "done" && (
                  <Button
                    onClick={() => {
                      setMarkingId(visit.id); // store current visit id
                      setShowDialog(true); // open the attachment modal
                    }}
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  >
                    Mark as Done
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {visit.attachments && visit.attachments.length > 0 ? (
                  <ul style={{ paddingLeft: "1rem" }}>
                    {visit.attachments.map((file, idx) => {
                      if (!file || !file.type || !file.data) return null;

                      return (
                        <li key={idx}>
                          <strong>{file.name || "Unnamed file"}</strong>
                          <br />
                          {file.type.startsWith("image/") ? (
                            <img src={file.data} alt={file.name} width={100} />
                          ) : file.type === "application/pdf" ? (
                            <a
                              href={file.data}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View PDF
                            </a>
                          ) : (
                            <a href={file.data} download={file.name}>
                              Download
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {setEditingId ? "Edit Visit" : "Add New Visit"}
        </DialogTitle>
        <DialogContent>
          <ServiceVisitForm onClose={handleCloseModal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <MarkAsDoneDialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
          setMarkingId(null);
        }}
        onSubmit={async (files) => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  name: file.name,
                  type: file.type,
                  data: reader.result,
                });
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });

          const attachments = await Promise.all(files.map(toBase64));

          dispatch(markServiceDone({ id: markingId, attachments }));
          setShowDialog(false);
          setMarkingId(null);
        }}
      />
    </div>
  );
};

export default ServiceVisitList;
