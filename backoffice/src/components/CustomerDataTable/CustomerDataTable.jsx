import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UpdateCustomer from "../customergestion/UpdateCustomer";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./CustomerDataTable.css";


//import { Link } from "react-router-dom";

export default function CustomerDatatable() {
  const customerColumns = [
    {
      field: "fullName",
      headerName: "Full Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
      headerClassName: "headerNameStyle",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "headerNameStyle",
    },

    {
      field: "creation_date",
      headerName: "Creation Date",
      flex: 1,
      headerClassName: "headerNameStyle",
    },
    {
      field: "last_login",
      headerName: "Last Login",
      flex: 1,
      headerClassName: "headerNameStyle",
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      headerClassName: "headerNameStyle",
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filteredcustomers, setFilteredCustomers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [editCustomerId, setEditCustomerId] = useState(null);
  const [openFormEdit, setOpenFormEdit] = useState(false);

  //const navigate = useNavigate();

  const rows = filteredcustomers.map(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/Customers");
        setCustomers(response.data);
        setFilteredCustomers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [openFormEdit, openForm, openDialog]);

  const handleEdit = (id) => {
    setEditCustomerId(id);
    setOpenFormEdit(true);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => {
                handleEdit(params.row.id);
              }}
            >
              <EditOutlinedIcon />
            </div>
          </div>
        );
      },
      headerClassName: "headerNameStyle",
    },
  ];
  
  //search and filter
  useEffect(() => {
    // Filter users based on input value
    const filteredcustomers = () => {
      const filtered = customers.filter((customer) => {
        const customerName = customer.first_name || "";
        return customerName.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredCustomers(filtered);
    };

    filteredcustomers();
  }, [inputValue, customers]);
  // const handleInput = (e) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="listCustomers">List of Customers</span>

        
      </div>
      {openFormEdit && (
      <UpdateCustomer
        setOpenFormEdit={setOpenFormEdit}
        customerId={editCustomerId}
      />
    )}
      <div className="tabContent">
        <DataGrid
          // initialState={{
          //   columns: {
          //     columnVisibilityModel: {
          //       id: false,
          //     },
          //   },
          // }}
          className="datagrid"
          rows={rows}
          columns={customerColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
