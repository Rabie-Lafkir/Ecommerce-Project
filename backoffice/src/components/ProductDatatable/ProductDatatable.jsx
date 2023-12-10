import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormAdd from "../FormAdd/FormAddproduct";
import FormEdit from "../FormEdit/FormEditproduct";
import Swal from "sweetalert2";
import axios from "axios";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import "../DataTable/DataTable.css";
//import { Link } from "react-router-dom";

const productColumns = [
  {
    field: "product_image",
    headerName: "Image",
    flex: 1,
    headerClassName: "headerNameStyle",

    renderCell: (params) => <img src={params.row.product_image} alt="Image" />,
  },

  {
    field:"product_image",
    headerName:"Product Image",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "product_name",
    headerName: "Name",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "sku",
    headerName: "Sku",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "short_description",
    headerName: "Short description",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "long_description",
    headerName: "Long description",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
];

export default function ProductDatatable() {
  const [openDialog, setOpenDialog] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const [editProductId, setEditProductId] = useState(null);
  const [openFormEdit, setOpenFormEdit] = useState(false);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleEdit = (id) => {
    setEditProductId(id);
    setOpenFormEdit(true);
  };

  const styles = {
    cancelButton: {
      color: "black",
      backgroundColor: "#ccc",
    },
    confirmButton: {
      color: "white",
      backgroundColor: "#0a5693",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [openFormEdit, openForm, openDialog]);

  const rows = filteredProducts.map(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
  }));
  //delete
  function handleDelete(id) {
    const conf = window.confirm("Do you want to delete?");
    if (conf) {
      axios
        .delete(`http://localhost:5000/v1/products/${id}`)
        .then((res) => {
          Swal.fire({
            title: "Success !",
            text: "Your Product has been deleted!",
            icon: "success",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const productName = product.product_name || "";
        return productName.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [inputValue, products]);
  const handleInput = (e) => {
    setInputValue(e.target.value);
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
                //console.log("params" + params.row.id);
              }}
            >
              <EditOutlinedIcon />
              {openFormEdit && editProductId && (
                <FormEdit
                  setOpenFormEdit={setOpenFormEdit}
                  productId={editProductId}
                />
              )}
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        );
      },
      headerClassName: "headerNameStyle",
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="listProduct">List of Products</span>

        <span className="link" onClick={() => setOpenForm(true)}>
          Add New Product
        </span>
      </div>
      <input
        type="text"
        className="search"
        onChange={handleInput}
        placeholder="Search Products"
      />

      {openForm && <FormAdd setOpenForm={setOpenForm} />}
      {openFormEdit && (
        <FormEdit setOpenFormEdit={setOpenFormEdit} productId={editProductId} />
      )}

      <div className="tabContent">
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          className="datagrid"
          rows={rows}
          columns={productColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
