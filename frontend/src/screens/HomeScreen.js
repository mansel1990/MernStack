import React, { useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddVesselForm from "./AddVesselForm";

const setOwnerName = (params) => {
  const newName = params.value;
  return { ...params.row, name: newName };
};
const columns = [
  { field: "id", headerName: "ID", width: 130, editable: false },
  {
    field: "name",
    headerName: "Owner Name",
    width: 130,
    editable: true,
    valueSetter: setOwnerName,
  },
  { field: "owner_id", headerName: "Owner ID", width: 130, editable: true },
  { field: "naccs_code", headerName: "NACCS Code", width: 130, editable: true },
];

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const getData = async () => {
    const apiData = await axios.get("/api/products/");
    console.log(apiData);
    setData(apiData.data);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [saved]);

  const processRowUpdate = useCallback(async (newRow) => {
    // const response = await dispatch(updateBackEndFunction(newRow));
    console.log(newRow);
    await axios.post(`/api/products/${newRow.id}`, newRow);
    return newRow; // return the new row containing the row id
  }, []);

  const handleNewRow = () => {
    setOpen(true);
  };
  const handleSaveAdd = async (row) => {
    console.log(row);
    const newR = await axios.post(`/api/products/`, row);
    console.log(newR);
    if (newR.statusText == "Created") {
      setSaved(!saved);
    }
    setOpen(false);
  };
  const handleCancelAdd = () => {
    setOpen(false);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ textAlign: "left" }}>
        <Button
          className="btn-dark"
          style={{ backgroundColor: "#343a40", color: "#fff" }}
          onClick={handleNewRow}
        >
          <AddIcon fontSize="small" /> Add
        </Button>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.log(error);
        }}
      />
      <br />
      <br />
      <p>* Click on the add icon and enter values to enter new vessel.</p>
      <p>
        * Double tap a row and edit the value. Press enter or tab out to save
        the value.
      </p>
      <AddVesselForm
        open={open}
        onSave={handleSaveAdd}
        onCancel={handleCancelAdd}
      />
    </div>
  );
};

export default HomeScreen;
