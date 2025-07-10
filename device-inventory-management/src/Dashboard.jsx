import React, { useState, useEffect } from "react";

const MedicalDeviceInventory = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: "X-Ray Machine",
        type: "Imaging",
        serialNumber: "XR-12345",
        location: "Radiology",
        documentUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: 2,
        name: "MRI Scanner",
        type: "Imaging",
        serialNumber: "MRI-67890",
        location: "Radiology",
        documentUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: 3,
        name: "Ventilator",
        type: "Life Support",
        serialNumber: "VENT-54321",
        location: "ICU",
        documentUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ]);
  }, []);

  console.log(devices);
  const DeleteEntry = (id) => {
    console.log(id);
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
                  <button onClick={() => DeleteEntry(device.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MedicalDeviceInventory;
