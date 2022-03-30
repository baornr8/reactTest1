import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import { createToDo } from "../store/toDo";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectToDoList } from "../store/toDo";
const AddToDo = ({ open }) => {
  const [newToDo, setNewToDo] = useState({
    title: "",
    description: "",
    checked: false,
    createdAt: moment().format("LL"),
    finishedAt: "",
    archiveAt: "",
    id: uuidv4(),
  });
  const dispatch = useDispatch();
  return (
    <div className="addToDo_container">
      <div className="addToDo">
        <p style={{ color: "gray" }}>Add New Todo</p>
        <TextField
          label="title"
          value={newToDo.title}
          onChange={(e) => setNewToDo({ ...newToDo, title: e.target.value })}
        />
        <TextField
          label="description"
          value={newToDo.description}
          onChange={(e) =>
            setNewToDo({ ...newToDo, description: e.target.value })
          }
        />
        <Button
          variant="contained"
          disabled={
            newToDo.title.length < 1 || newToDo.description.length < 1
              ? true
              : false
          }
          onClick={() => {
            dispatch(createToDo(newToDo));
            open(false);
          }}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default AddToDo;
