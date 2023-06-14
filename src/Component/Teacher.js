import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";

const Teacher = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    teacherName: "",
    age: "",
    subject: "",
    email: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://633c710ef11701a65f7642c1.mockapi.io/teachers"
      );
      console.log(response.data);
      setTeacherData(response.data);
    };
    getData();
  }, []);

  const handleValidate = (formDataToValidate) => {
    var error = {};
    if (formDataToValidate.teacherName === "")
      error.teacherName = "Enter a  Teacher Name";
    if (formDataToValidate.age === "") error.age = "Enter a  Age";
    if (formDataToValidate.subject === "") error.subject = "Enter a  Subject";
    if (formDataToValidate.email === "") error.email = "Enter a  E-Mail";
    return error;
  };

  const handleSubmit = async (formSubmittedData, { resetForm }) => {
    if (formData.id) {
      // Update handling teachers
      const response = await axios.put(
        `https://633c710ef11701a65f7642c1.mockapi.io/teachers/${formData.id}`,
        { ...formSubmittedData }
      );
      let update = [...teacherData];
      let index = teacherData.findIndex((row) => row.id === formData.id);
      update[index] = response.data;
      setTeacherData(update);
      resetForm();
    } else {
      // Create new teacher profile
      const response = await axios.post(
        "https://633c710ef11701a65f7642c1.mockapi.io/teachers",
        { ...formSubmittedData }
      );
      setTeacherData([...teacherData, response.data]);
      resetForm();
    }
  };
  const onPopulateData = (id) => {
    const selectedData = teacherData.filter((row) => row.id === id)[0];
    setFormData({ ...selectedData });
  };

  // deleting teachers details
  const handleDelete = async (id) => {
    let confirm = window.confirm(
      "Are you sure you want to delete this teacher details?"
    );
    if (confirm) {
      const response = await axios.delete(
        `https://633c710ef11701a65f7642c1.mockapi.io/teachers/${id}`
      );
      const unDeletedData = teacherData.filter((row) => row.id !== id);
      setTeacherData(unDeletedData);
    }
  };

  return (
    <>
      {/* Form */}
      <div className="container">
        <h2 className="my-2">Handling Teachers</h2>

        <Formik
          initialValues={formData}
          validate={handleValidate}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
          }) => (
            <Box
              className="form"
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                sx={{
                  "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
                }}
                id="teacherName"
                type="text"
                label="Teacher Name"
                variant="outlined"
                value={values.teacherName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: "red" }}>
                <p>{touched.teacherName && errors.teacherName}</p>
              </span>
              <TextField
                sx={{
                  "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
                }}
                id="age"
                type="number"
                label="Age"
                variant="outlined"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: "red" }}>
                <p>{touched.age && errors.age}</p>
              </span>
              <TextField
                sx={{
                  "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
                }}
                id="subject"
                type="text"
                label="Subject"
                variant="outlined"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p>
                <span style={{ color: "red" }}>
                  {touched.subject && errors.subject}
                </span>
              </p>
              <TextField
                sx={{
                  "& > :not(style)": { m: 1, width: 400, maxWidth: "100%" },
                }}
                id="email"
                type="text"
                label="E-Mail"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: "red" }}>
                <p>{touched.email && errors.email}</p>
              </span>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Save
              </Button>{" "}
              &nbsp;
              <Button variant="contained" onClick={resetForm}>
                Reset
              </Button>
            </Box>
          )}
        </Formik>

        {/* Table */}
        <p className="my-3"></p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  className="text-secondary fw-bolder fs-6"
                >
                  Id
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Teacher Name
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Age
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Subject
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  E-Mail
                </TableCell>
                <TableCell
                  align="center"
                  className="text-secondary fw-bolder fs-6"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teacherData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.teacherName}</TableCell>
                  <TableCell align="center">{row.age}</TableCell>
                  <TableCell align="center">{row.subject}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => onPopulateData(row.id)}
                    >
                      Edit
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Teacher;
