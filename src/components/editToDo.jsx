import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { editToDo } from "../store/toDo";
import moment from "moment";
const EditToDo = ({ edit, open }) => {
  const [editToDoo, setEditToDo] = useState(edit);
  const dispatch = useDispatch();
  return (
    <div className="EditToDo_container">
      <div className="EditToDo">
        <TextField
          label="title"
          value={edit && editToDoo.title}
          onChange={(e) => setEditToDo({ ...editToDoo, title: e.target.value })}
        />
        <TextField
          label="description"
          value={edit && editToDoo.description}
          onChange={(e) =>
            setEditToDo({ ...editToDoo, description: e.target.value })
          }
        />

        {edit && !edit.checked && (
          <IconButton
            color="primary"
            size="large"
            onClick={() =>
              setEditToDo({
                ...editToDoo,
                checked: true,
                finishedAt: moment().format("LL"),
              })
            }
            children={<CheckIcon sx={{ width: "5vw", height: "8vh" }} />}
          />
        )}

        <Button
          variant="contained"
          onClick={() => {
            dispatch(editToDo(editToDoo));
            open(false);
          }}
          disabled={
            editToDoo.title?.length < 1 || editToDoo.description?.length < 1
              ? true
              : false
          }
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default EditToDo;
