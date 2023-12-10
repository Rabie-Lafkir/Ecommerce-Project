import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import UpdateCustomer from './UpdateCustomer.jsx';
export default function Customer() {
  const [customers, setCustomers] = useState([]);
    const [filteredcustomers, setFilteredCustomers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate=useNavigate()
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/v1/Customers"
          );
          setCustomers(response.data);
          setFilteredCustomers(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
  
      fetchData();
    }, [])
  
   
  
   
    const rows = 
    filteredcustomers.map(({ _id, ...rest}) => ({id:_id,...rest}))
  const columns = [

    
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.first_name || ''} ${params.row.last_name || ''}`,
      },


    { field: 'email',headerName: 'email',width: 300},
    
    { field: 'creation_date',headerName: 'creation_date',width: 300},
    { field: 'last_login',headerName: 'last_login',width: 300},
    { field: 'active',headerName: 'active',width: 150},
   
   
    {field: 'Update',headerName: 'Update',width: 150,renderCell: (params) => (
      

  <Button
    variant="contained"
    color="success"
    onClick={() => navigate(`/updateCustomer/${params.row.id}`)} 
  >
    Update
  </Button>
),

      
    },
  
    
  
  ];
  useEffect(() => {
    // Filter users based on input value
    const filterProducts = () => {
      const filtered = customers.filter((customer) => {
        const customerName = customer.first_name ||"";
        return customerName.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredCustomers(filtered);
    };
  
    filterProducts();
  }, [inputValue, Customer]);
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };




  return (
    <div>
            <Grid container spacing={34} alignItems="center">
        
        <Grid item>
          <input
            type="text"
            className="search"
            onChange={handleInput}
            placeholder="Search Products"
          />
        </Grid>
      </Grid>

         <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  
      
    </div>
  )
}