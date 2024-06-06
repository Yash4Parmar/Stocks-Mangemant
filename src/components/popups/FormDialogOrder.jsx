import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useGetStocksQuery } from '../../utils/apiSlice';
import { CircularProgress } from '@mui/material';

export default function FormDialogOrder({addOrder}) {
  const [open, setOpen] = React.useState(false);
  const [stock, setStock] = React.useState('');
  const { data: stocks, isLoading } = useGetStocksQuery();
  if(!stocks?.data || isLoading) return <CircularProgress />;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            addOrder(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details to add a new order.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="customerName"
            name="customerName"
            label="Customer Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="stock-label">Stock Name</InputLabel>
            <Select
              labelId="stock-label"
              id="stock"
              name="stock"
              value={stock}
              onChange={handleStockChange}
              fullWidth
              variant="standard"
            >
              {stocks?.data.map(stock =>
              <MenuItem key={stock.id} value={stock.id}>{stock.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Order</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
