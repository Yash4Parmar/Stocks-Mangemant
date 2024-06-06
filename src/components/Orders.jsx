import React, { useEffect, useState } from 'react';
import { useAddOrderMutation, useDeleteorderMutation, useGetOrdersQuery } from '../utils/apiSlice';
import DataTable from './DataTable';
import { OrderColumns } from '../utils/contants';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import AlertDialogSlide from './popups/AlertDialogSlide';
import FormDialog from './popups/FormDialogOrder';
import FormDialogStock from './popups/FormDialogStock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { data: orders, isLoading, refetch } = useGetOrdersQuery();
  const [orderData, setOrderData] = useState([]);
  const [addOrderMutation] = useAddOrderMutation();
  const [deleteOrder] = useDeleteorderMutation();

  useEffect(() => {
    if (orders?.data) {
      setOrderData(orders.data);
    }
  }, [orders]);

  const handleClickOpenPopup = (id) => {
    setOrderId(id);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const onDelete = async () => {
    try {
      await deleteOrder(orderId);
      toast.success("Order deleted");
      handleClosePopup();
      refetch();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    }
  };

  const addOrder = async (formData) => {
    try {
      const formDataWithSid = { ...formData, sid: formData.stock };
      await addOrderMutation(formDataWithSid);
      toast.success("Order added");
      refetch();
      console.log("added");
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Error adding order");
    }
  };

  if (!orders?.data || isLoading) return <CircularProgress />;
  console.log(orders.data);

  return (
    <div>
      <ToastContainer />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Orders</Typography>
        <FormDialog addOrder={addOrder} />
      </Box>
      <AlertDialogSlide open={openPopup} handleClose={handleClosePopup} message={"Are you sure to delete order?"} OnAgreeClick={onDelete} />
      <DataTable columns={OrderColumns} rows={orderData} onDelete={handleClickOpenPopup} />
    </div>
  );
};

export default Orders;
