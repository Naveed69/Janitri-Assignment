// src/pages/Contracts/components/ContractList.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContract } from "../../../features/contracts/contractsSlice";
import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ContractList = ({ setEditingId }) => {
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.contracts);
  const devices = useSelector((state) => state.devices);

  return (
    <Grid container spacing={2}>
      {contracts.map((c) => {
        const device = devices.find((d) => d.id === c.deviceId);
        const status = new Date(c.endDate) > new Date() ? "Active" : "Expired";

        return (
          <Grid item xs={12} md={6} key={c.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {device ? device.name : "N/A"}
                </Typography>
                <Typography variant="body2">Type: {c.type}</Typography>
                <Typography variant="body2">Start: {c.startDate}</Typography>
                <Typography variant="body2">End: {c.endDate}</Typography>
                <Typography variant="body2">Status: {status}</Typography>
                <IconButton onClick={() => setEditingId(c.id)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => dispatch(deleteContract(c.id))}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ContractList;
