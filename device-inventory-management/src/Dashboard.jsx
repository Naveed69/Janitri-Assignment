import React, { useState, useEffect } from "react";

const MedicalDeviceInventory = () => {
  const [devices, setDevices] = useState([]);
  const [addIsOn, setAddIsOn] = useState(false);

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: "X-Ray Machine",
        type: "Imaging",
        serialNumber: "XR-12345",
        location: "Radiology",
      },
      {
        id: 2,
        name: "MRI Scanner",
        type: "Imaging",
        serialNumber: "MRI-67890",
        location: "Radiology",
      },
      {
        id: 3,
        name: "Ventilator",
        type: "Life Support",
        serialNumber: "VENT-54321",
        location: "ICU",
      },
    ]);
  }, []);
  const device = {
    id: 4,
    name: "BP Machine",
    type: "Life Support",
    serialNumber: "BP-54321",
    location: "ICU",
  };
  const addEntry = (device) => {
    setDevices([
      ...devices,
      {
        id: device.id,
        name: device.name,
        type: device.type,
        serialNumber: device.serialNumber,
        location: device.location,
      },
    ]);
  };
  const deleteEntry = (id) => {
    setDevices(devices.filter((d) => d.id !== id));
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Serial Number</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => {
            return (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.name}</td>
                <td>{device.serialNumber}</td>

                <td>
                  <button onClick={() => deleteEntry(device.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {addIsOn ? (
        <>
          <h2>Please Fill New Device Details</h2>
          <button onClick={() => addEntry(device)}>Add</button>
        </>
      ) : (
        <></>
      )}

      <button onClick={() => setAddIsOn(true)}>Add New Device</button>
    </>
  );
};

export default MedicalDeviceInventory;
