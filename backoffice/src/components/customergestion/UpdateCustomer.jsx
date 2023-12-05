import React, { useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const schema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().required().email(),
});

export default function UpdateCustomer(customerId, setOpenFormEdit) {
  // const navigate = useNavigate();
  const id = customerId;
  const [open, setOpen] = useState(false);
 

  //const { id } = useParams();
  const [customers, setCustomers] = useState({
    id: id,
    first_name: "",
    last_name: "",

    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/v1/customers/" + id
        );
        const data = response.data;
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInput = (e) => {
    setCustomers({ ...customers, [e.target.name]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      dirtyFields,
      submitCount,
      isLoading,
      isSubmitSuccessful,
    },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setOpenFormEdit(false);
    
  };

  const submitForm = async () => {
    try {
      await axios.put(`http://localhost:5000/v1/customers/${id}`, customers);
      console.log(customers);
      setOpen(false);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Customer</DialogTitle>
      <DialogContent>
        {" "}
        {submitCount > 3 ? (
          <div className="alert alert-danger" role="alert">
            <strong>
              You are blocked, please contact the administrator!!!
            </strong>
          </div>
        ) : (
          <>
            {isLoading && <div>Loading...</div>}
            {isSubmitSuccessful && (
              <div className="alert alert-primary" role="alert">
                <strong>Success: </strong>Form submitted!
              </div>
            )}
            <form onSubmit={handleSubmit(submitForm)} onChange={handleInput}>
              <hr />
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="first_name">
                  First name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  {...register("first_name")}
                  value={customers.first_name}
                />
                {errors.first_name && (
                  <span className="text-danger">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="last_name">
                  Last name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  {...register("last_name")}
                  value={customers.last_name}
                />
                {errors.last_name && (
                  <span className="text-danger">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    {...register("email")}
                    value={customers.email}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </div>
              </div>
              <hr />

              <DialogActions>
              <Button onClick={handleClose} className="buttonCancel">
              Cancel
            </Button>
                <button
                  disabled={!isValid || Object.keys(dirtyFields).length === 0}
                  type="submit"
                  className="btn btn-primary w-100 mb-4"
                >
                  Submit
                </button>
              </DialogActions>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
