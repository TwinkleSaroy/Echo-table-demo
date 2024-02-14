import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const initialData = [
  { id: 1, name: "Jackson", gender: "Male", age: 5, class: "1" },
  { id: 2, name: "Janet", gender: "Female", age: 10, class: "2" },
  { id: 3, name: "Riya", gender: "Female", age: 12, class: "3" },
  { id: 4, name: "heena", gender: "Male", age: 5, class: "1" },
  { id: 5, name: "boot", gender: "Male", age: 10, class: "5" },
  { id: 6, name: "amar", gender: "Female", age: 12, class: "4" },
];
const TableDemo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialData);
  const [errorMsg, setErrorMsg] = useState("");

  const [rowsData, setRowsData] = useState({
    name: "",
    gender: "",
    age: "",
    class: "",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setRowsData({
      name: "",
      gender: "",
      age: "",
      class: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      if (isNaN(value)) {
        return;
      }
    }
    setRowsData((rdata) => ({
      ...rdata,
      [name]: value,
    }));
  };

  const handleDeleteRow = (row) => {
    const deleteRow = rows?.filter((r) => row?.id !== r?.id);
    setRows(deleteRow);
  };
  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, rowsData]);
    setRowsData({
      name: "",
      gender: "",
      age: "",
      class: "",
    });
    handleCloseModal();
  };

  const tableHeading = [
    {
      id: 1,
      Hname: "S.No",
    },
    {
      id: 2,
      Hname: "Name",
    },
    {
      id: 3,
      Hname: "Gender",
    },
    {
      id: 4,
      Hname: "Age",
    },
    {
      id: 5,
      Hname: "Class",
    },
    {
      id: 6,
      Hname: "Delete Row",
    },
  ];

  const textFieldData = [
    {
      placeholder: "Enter Name",
      name: "name",
      value: rowsData.name,
      type: "text",
    },
    {
      placeholder: "Select Gender",
      name: "gender",
      value: rowsData.gender,
      type: "text",
    },
    {
      placeholder: "Enter Age",
      name: "age",
      value: rowsData.age,
      type: "text",
    },
    {
      placeholder: "Select Class",
      name: "class",
      value: rowsData.class,
      type: "text",
    },
  ];
  const isAllFieldsFilled = () => {
    return textFieldData?.every((text) => text?.value !== "");
  };
  const handleSortTable = (id) => {
    let sortedData = rows.sort((a, b) =>
      id === 4
        ? a?.age - b?.age
        : id === 5
        ? a?.class - b?.class
        : id === 3
        ? a.gender.toUpperCase() > b.gender.toUpperCase()
          ? 1
          : 0
        : a.name.toUpperCase() > b.name.toUpperCase()
        ? 1
        : 0
    );
    setRows([...sortedData]);
  };

  const handleValidation = (e) => {
    let filedName = e.target.name;
    let fieldValue = e.target.value;

    if (filedName === "name" && fieldValue !== "") {
      if (fieldValue?.length > 32)
        setErrorMsg("Maximum 32 character are allowed");
      else
        for (let i = 0; i < fieldValue?.length; i++) {
          let ascii = fieldValue.charCodeAt(i);
          if (
            !(
              ascii === 32 ||
              (ascii >= 65 && ascii <= 90) ||
              (ascii >= 97 && ascii <= 122)
            )
          ) {
            setErrorMsg("Please enter only alphabets characters");
            break;
          } else setErrorMsg("");
        }
    } else if (filedName === "age" && (fieldValue === "0" || fieldValue > 99))
      setErrorMsg(
        `Age can't be ${fieldValue} please enter a number between 1-100`
      );
    else setErrorMsg("");
  };

  return (
    <Grid container style={{ alignItems: "center" }}>
      <Grid
        item
        style={{
          alignItems: "center",
          justifyItems: "flex-start",
          display: "flex",
          width: "100%",
          height: "50px",
          margin: "10px",
          marginLeft: "5%",
        }}
      >
        <Button
          onClick={handleOpenModal}
          variant="contained"
          color="success"
          style={{
            textTransform: "none",
          }}
        >
          Add Rows
        </Button>
      </Grid>

      <TableContainer
        component={Paper}
        style={{ width: "100%", marginRight: "5%", marginLeft: "5%" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {tableHeading?.map((t) => {
                return (
                  <TableCell
                    key={t.id}
                    style={{ color: "black", fontWeight: "bolder" }}
                  >
                    {t.Hname}
                    &nbsp; &nbsp;
                    {t?.id !== 1 && t?.id !== 6 && (
                      <Tooltip title="sort" arrow>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSortTable(t?.id)}
                        >
                          ⬇️
                        </span>
                      </Tooltip>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>Class {`${row.class}`}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    style={{
                      textTransform: "none",
                    }}
                    onClick={() => handleDeleteRow(row, index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: "400px" }}>
              <Grid
                container
                justifyContent="center"
                style={{ alignItems: "center" }}
              >
                <Typography variant="h6">Add New Row</Typography>

                {textFieldData?.map((d) => {
                  return (
                    <Grid
                      item
                      style={{
                        width: "100%",
                        justifyItems: "center",
                        alignContent: "center",
                        margin: "5px",
                      }}
                      key={d.name}
                    >
                      <TextField
                        fullWidth
                        name={d?.name}
                        type={d?.type}
                        value={d?.value}
                        onChange={handleChange}
                        select={d?.name === "class" || d?.name === "gender"}
                        label={d?.placeholder}
                        maxLength={d?.name === "age" ? 2 : ""}
                        onKeyUp={(e) => handleValidation(e)}
                        error={
                          document.activeElement?.name === d?.name && !!errorMsg
                        }
                        helperText={
                          document.activeElement?.name === d?.name && errorMsg
                        }
                      >
                        {d?.name === "class" &&
                          [1, 2, 3, 4, 5]?.map((c) => {
                            return (
                              <MenuItem value={c} key={c}>
                                {"class" + " " + c}
                              </MenuItem>
                            );
                          })}
                        {d?.name === "gender" &&
                          ["Male", "Female", "Other"]?.map((c) => {
                            return (
                              <MenuItem value={c} key={c}>
                                {c}
                              </MenuItem>
                            );
                          })}
                      </TextField>
                    </Grid>
                  );
                })}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    textTransform: "none",
                  }}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    textTransform: "none",
                    marginLeft: "10px",
                  }}
                  onClick={handleAddRow}
                  disabled={!isAllFieldsFilled()}
                >
                  Add
                </Button>
              </Grid>
            </Box>
          </Modal>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default TableDemo;
