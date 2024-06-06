import React, { useEffect, useState } from 'react';
import { useAddStockMutation, useDeleteStockMutation, useGetStocksQuery } from '../utils/apiSlice';
import { Box, CircularProgress, Typography } from '@mui/material';
import DataTable from './DataTable';
import FormDialogStock from './popups/FormDialogStock';
import AlertDialogSlide from './popups/AlertDialogSlide';
import { StockColumns } from '../utils/contants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Stocks = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [stockId, setStockId] = useState(null);
  const { data: stocks, isLoading, refetch } = useGetStocksQuery();
  const [deleteStock] = useDeleteStockMutation();
  const [addStockMutation] = useAddStockMutation();
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    if (stocks?.data) {
      setStocksData(stocks.data);
    }
  }, [stocks]);

  const handleClickOpenPopup = (id) => {
    setStockId(id);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const onDelete = async () => {
    try {
      await deleteStock(stockId);
      toast.success("Stock deleted");
      handleClosePopup();
      refetch();
    } catch (error) {
      console.error("Error deleting stock:", error);
      toast.error("Error deleting stock");
    }
  };

  const addStock = async (formData) => {
    try {
      await addStockMutation(formData);
      toast.success("Stock added");
      refetch();
      console.log("added");
    } catch (error) {
      console.error("Error adding stock:", error);
      toast.error("Error adding stock");
    }
  };

  if (!stocks?.data || isLoading) return <CircularProgress />;
  console.log(stocks.data);

  return (
    <div>
      <ToastContainer />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Stocks</Typography>
        <FormDialogStock addStock={addStock} />
      </Box>
      <AlertDialogSlide open={openPopup} handleClose={handleClosePopup} message={"Are you sure to delete Stock?"} OnAgreeClick={onDelete} />
      <DataTable columns={StockColumns} rows={stocksData} onDelete={handleClickOpenPopup} />
    </div>
  );
};

export default Stocks;
