export const sideBarItems = ['Stock', 'Orders'];

export const API_URL = "https://localhost:7284/api";


export const OrderColumns = [
    
    { field: 'customerName', headerName: 'Customer', width: 130 },
    { field: 'stockName', headerName: 'Stock name', width: 130 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 90,
    }
  ];

  export const StockColumns = [
    
    { field: 'name', headerName: 'Stock name', width: 130 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 90,
    }
  ];