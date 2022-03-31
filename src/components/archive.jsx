import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToDo, selectArchiveList } from "../store/toDo";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsIcon from "@mui/icons-material/Settings";

const Archive = ({ openInfo, info, openEdit, edit }) => {
  const getArchiveList = useSelector(selectArchiveList);
  const dispatch = useDispatch();
  return (
    <div className="archive_continer">
      <div>
        {getArchiveList.map((key, i) => (
          <div className="todo" style={{ width: "28vw" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "28vw",
                color: "white",
              }}
            >
              <p style={{ margin: "3vh" }}>{key.title}</p>
              {key.checked ? <CheckIcon /> : null}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "20vw",
              }}
            >
              <IconButton
                size="small"
                sx={{ backgroundColor: "gray" }}
                children={<QuestionMarkIcon />}
                onClick={() => {
                  openInfo(true);
                  info(key);
                }}
              />

              <Button
                variant="contained"
                size="small"
                color="info"
                endIcon={<SettingsIcon />}
                onClick={() => {
                  openEdit(true);
                  edit(key);
                }}
              >
                edit
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={() => dispatch(deleteToDo(key.id))}
              >
                delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
