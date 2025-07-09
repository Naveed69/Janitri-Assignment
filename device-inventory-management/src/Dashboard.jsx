import React, { useState, useEffect } from "react";
import DocumentViewer from "./DocumentViewer";

const MedicalDeviceInventory = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    serialNumber: "",
    location: "",
  });
  const [editingDevice, setEditingDevice] = useState(null);

  // Dummy data for initial load
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDevice) {
      setEditingDevice({ ...editingDevice, [name]: value });
    } else {
      setNewDevice({ ...newDevice, [name]: value });
    }
  };

  const handleAddDevice = (e) => {
    e.preventDefault();
    const newId =
      devices.length > 0
        ? Math.max(...devices.map((device) => device.id)) + 1
        : 1;
    setDevices([...devices, { id: newId, ...newDevice }]);
    setNewDevice({ name: "", type: "", serialNumber: "", location: "" });
  };

  const handleUpdateDevice = (e) => {
    e.preventDefault();
    setDevices(
      devices.map((device) =>
        device.id === editingDevice.id ? editingDevice : device
      )
    );
    setEditingDevice(null);
  };

  const handleDeleteDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  const startEditing = (device) => {
    setEditingDevice(device);
  };

  const cancelEditing = () => {
    setEditingDevice(null);
  };

  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [currentDocumentUrl, setCurrentDocumentUrl] = useState("");

  const handleViewDocument = (url) => {
    setCurrentDocumentUrl(url);
    setShowDocumentViewer(true);
  };

  return (
    <div>
      <h2>Medical Device Inventory Dashboard</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Serial Number</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>{device.serialNumber}</td>
              <td>{device.location}</td>
              <td>
                <button onClick={() => startEditing(device)}>Edit</button>
                <button onClick={() => handleDeleteDevice(device.id)}>
                  Delete
                </button>
                <button onClick={() => handleViewDocument(device.documentUrl)}>
                  View Document
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingDevice ? (
        <div>
          <h3>Edit Device</h3>
          <form onSubmit={handleUpdateDevice}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editingDevice.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={editingDevice.type}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Serial Number:
              <input
                type="text"
                name="serialNumber"
                value={editingDevice.serialNumber}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={editingDevice.location}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Update Device</button>
            <button type="button" onClick={cancelEditing}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h3>Add New Device</h3>
          <form onSubmit={handleAddDevice}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newDevice.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={newDevice.type}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Serial Number:
              <input
                type="text"
                name="serialNumber"
                value={newDevice.serialNumber}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={newDevice.location}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Add Device</button>
          </form>
        </div>
      )}

      {showDocumentViewer && (
        <div className="document-viewer-overlay">
          <button onClick={() => setShowDocumentViewer(false)}>Close</button>
          <DocumentViewer pdfUrl={currentDocumentUrl} />
        </div>
      )}
    </div>
  );
};

export default MedicalDeviceInventory;
