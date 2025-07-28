import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContract } from "../../../features/contracts/contractsSlice";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ContractList = ({ setEditingId }) => {
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.contracts);
  const devices = useSelector((state) => state.devices);

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((c) => {
            const device = devices.find((d) => d.id === c.deviceId);
            const status =
              new Date(c.endDate) > new Date() ? "Active" : "Expired";

            return (
              <TableRow key={c.id}>
                <TableCell>{device ? device.name : "N/A"}</TableCell>
                <TableCell>{c.type}</TableCell>
                <TableCell>{c.startDate}</TableCell>
                <TableCell>{c.endDate}</TableCell>
                <TableCell>
                  <Typography
                    color={status === "Active" ? "green" : "red"}
                    fontWeight="bold"
                  >
                    {status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditingId(c.id)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(deleteContract(c.id))}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContractList;
