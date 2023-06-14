import React, { useEffect, useState } from "react";
import "../App.css";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Formik } from "formik";

const Student = () => {
  const [studentData, setStudentData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    studentName: "",
    section: "",
    gender: "",
    averageMark: "",
    attendance: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://62f27b4218493ca21f34beae.mockapi.io/student"
      );
      console.log(response.data);
      setStudentData(response.data);
    };
    getData();
  }, []);

  const handleValidate = (formDataToValidate) => {
    var error = {};
    if (formDataToValidate.studentName === "")
      error.studentName = "Enter a  Student Name";
    if (formDataToValidate.section === "") error.section = "Enter a  Section";
    if (formDataToValidate.gender === "") error.gender = "Enter a  Gender";
    if (formDataToValidate.averageMark === "")
      error.averageMark = "Enter a  Average Mark";
    if (formDataToValidate.attendance === "")
      error.attendance = "Enter a  Attendance";
    return error;
  };

  const handleSubmit = async (formSubmittedData, { resetForm }) => {
    if (formData.id) {
      // Update student details
      const response = await axios.put(
        `https://62f27b4218493ca21f34beae.mockapi.io/student/${formData.id}`,
        { ...formSubmittedData }
      );
      let update = [...studentData];
      let index = studentData.findIndex((row) => row.id === formData.id);
      update[index] = response.data;
      setStudentData(update);
      resetForm();
    } else {
      // Create new student details
      const response = await axios.post(
        "https://62f27b4218493ca21f34beae.mockapi.io/student",
        { ...formSubmittedData }
      );
      setStudentData([...studentData, response.data]);
      resetForm();
    }
  };
  const onPopulateData = (id) => {
    const selectedData = studentData.filter((row) => row.id === id)[0];
    setFormData({ ...selectedData });
  };

  // deleting student details
  const handleDelete = async (id) => {
    let confirm = window.confirm(
      "Are you sure you want to delete this student details?"
    );
    if (confirm) {
      const response = await axios.delete(
        `https://62f27b4218493ca21f34beae.mockapi.io/student/${id}`
      );
      const unDeletedData = studentData.filter((row) => row.id !== id);
      setStudentData(unDeletedData);
    }
  };

  return (
    <>
      {/* Form */}
      <div className="container">
        <h2 className="my-2">Top Ranker of Class 10</h2>

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
                  "& > :not(style)": { m: 1, width: 400 },
                }}
                id="studentName"
                type="text"
                label="Student Name"
                variant="outlined"
                value={values.studentName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: "red" }}>
                <p>{touched.studentName && errors.studentName}</p>
              </span>
              <FormControl sx={{ m: 1, width: 400 }}>
                <InputLabel id="label-section">Section</InputLabel>
                <Select
                  labelId="label-section"
                  id="section"
                  name="section"
                  label="Section"
                  value={values.section}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={"Section - A"}>Section - A</MenuItem>
                  <MenuItem value={"Section - B"}>Section - B</MenuItem>
                  <MenuItem value={"Section - C"}>Section - C</MenuItem>
                </Select>
              </FormControl>
              <p>
                <span style={{ color: "red" }}>
                  {touched.section && errors.section}
                </span>
              </p>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="gender"
                  id="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              <p>
                <span style={{ color: "red" }}>
                  {touched.gender && errors.gender}
                </span>
              </p>
              <TextField
                sx={{
                  "& > :not(style)": { m: 1, width: 400 },
                }}
                id="averageMark"
                type="number"
                label="Average Mark"
                variant="outlined"
                value={values.averageMark}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p>
                <span style={{ color: "red" }}>
                  {touched.averageMark && errors.averageMark}
                </span>
              </p>
              <TextField
                sx={{
                  "& > :not(style)": { m: 1, width: 400 },
                }}
                id="attendance"
                type="number"
                label="Attendance"
                variant="outlined"
                value={values.attendance}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span style={{ color: "red" }}>
                <p>{touched.attendance && errors.attendance}</p>
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
                  Student Name
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Section
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Gender
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Average Mark (%)
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Attendance (%)
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
              {studentData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.studentName}</TableCell>
                  <TableCell align="center">{row.section}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.averageMark}</TableCell>
                  <TableCell align="center">{row.attendance}</TableCell>
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

export default Student;
