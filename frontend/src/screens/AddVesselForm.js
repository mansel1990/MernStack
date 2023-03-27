import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddVesselForm = (props) => {
  const [product, setProduct] = useState({
    name: "",
    naccsCode: "",
    ownerId: "",
  });

  const handleClose = () => {
    props.onCancel();
  };

  const handleSave = () => {
    props.onSave(product);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Adding</DialogContentText>

          <FormControl className="py-3" style={{ width: 280 }}>
            <TextField
              autoFocus
              id="product-name-input"
              className="py-3 my-2"
              label="Owner Name"
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <TextField
              id="product-oneliner-input"
              className="py-3 my-2"
              label="Owner ID"
              type="text"
              value={product.oneLiner}
              onChange={(e) =>
                setProduct({ ...product, ownerId: e.target.value })
              }
            />
            <TextField
              id="product-name-input"
              className="py-3 my-2"
              label="NACCS Code"
              type="text"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, naccsCode: e.target.value })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVesselForm;
