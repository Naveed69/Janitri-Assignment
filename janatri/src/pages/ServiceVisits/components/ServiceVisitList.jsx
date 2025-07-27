import React from "react";
import styles from "./ServiceVisitList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteServiceVisit } from "../../../features/serviceVisits/serviceVisitsSlice";
import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { markServiceDone } from "../../../features/serviceVisits/serviceVisitsSlice";

const ServiceVisitList = ({ setEditingId }) => {
  const dispatch = useDispatch();
  const visits = useSelector((state) => state.serviceVisits);
  const devices = useSelector((state) => state.devices);

  const handleDelete = (id) => {
    dispatch(deleteServiceVisit(id));
  };

  return (
    <Grid container spacing={2}>
      {visits.map((visit) => {
        const device = devices.find((d) => d.id === visit.deviceId);
        return (
          <Grid item xs={12} md={6} key={visit.id}>
            <Card className={styles.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {device ? device.name : "🛑 Deleted Device"}
                </Typography>
                <Typography variant="body2">
                  <strong>Technician:</strong> {visit.technician}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {visit.date}
                </Typography>
                <Typography variant="body2">
                  <strong>Notes:</strong> {visit.notes || "-"}
                </Typography>
                <div className={styles.actions}>
                  <IconButton
                    onClick={() => setEditingId(visit.id)}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(visit.id)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2">
                    <strong>Status:</strong>{" "}
                    {visit.status === "done" ? "✅ Completed" : "⏳ Pending"}
                  </Typography>

                  {visit.status === "pending" && (
                    <IconButton
                      size="small"
                      onClick={() => dispatch(markServiceDone(visit.id))}
                      variant="outlined"
                      sx={{ marginTop: "0.5rem" }}
                    >
                      Mark as Done
                    </IconButton>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ServiceVisitList;
