import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import Dialog from "@mui/material/Dialog";
import AddToDo from "./addToDo";
import { useDispatch, useSelector } from "react-redux";
import { selectToDoList, deleteToDo, editToDo as edit } from "../store/toDo";
import EditToDo from "./editToDo";
import moment from "moment";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ShowToDo from "./showToDo";
import Archive from "./archive";
const ToDo = () => {
  const [openNew, setOpenNew] = useState(false);
  const getToDoList = useSelector(selectToDoList);
  const dispatch = useDispatch();
  const [editToDo, setEditToDo] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoToDo, setInfoToDo] = useState();
  const [openArchive, setOpenArchive] = useState(false);

  return (
    <div className="toDo_container">
      <div className="toDo_navBar">
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddBoxIcon sx={{ width: "3vw", height: "5vh" }} />}
          onClick={() => setOpenNew(true)}
        >
          Add
        </Button>
        <Button
          variant="contained"
          endIcon={<ArchiveIcon sx={{ width: "3vw", height: "5vh" }} />}
          onClick={() => setOpenArchive(true)}
        >
          archive list
        </Button>
      </div>

      <div className="todo__">
        {getToDoList.map((key, i) => (
          <div className="todo">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50vw",
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
                size="large"
                sx={{ backgroundColor: "gray" }}
                children={<QuestionMarkIcon />}
                onClick={() => {
                  setOpenInfo(true);
                  setInfoToDo(key);
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "gray" }}
                endIcon={key.archiveAt.length > 0 && <ArchiveIcon />}
                onClick={() =>
                  dispatch(edit({ ...key, archiveAt: moment().format("LL") }))
                }
              >
                archive
              </Button>
              <Button
                variant="contained"
                size="small"
                color="info"
                endIcon={<SettingsIcon />}
                onClick={() => {
                  setOpenEdit(true);
                  setEditToDo(key);
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
      <Dialog open={openNew ? true : false} onClose={() => setOpenNew(false)}>
        <AddToDo open={setOpenNew} />
      </Dialog>

      <Dialog open={openEdit ? true : false} onClose={() => setOpenEdit(false)}>
        <EditToDo edit={editToDo} open={setOpenEdit} />
      </Dialog>
      <Dialog open={openInfo ? true : false} onClose={() => setOpenInfo(false)}>
        <ShowToDo show={infoToDo} open={setOpenInfo} />
      </Dialog>
      <Dialog
        open={openArchive ? true : false}
        onClose={() => setOpenArchive(false)}
      >
        <Archive
          openInfo={setOpenInfo}
          info={setInfoToDo}
          openEdit={setOpenEdit}
          edit={editToDo}
        />
      </Dialog>
    </div>
  );
};

export default ToDo;
