import { TextField } from "@mui/material";
import React from "react";

const ShowToDo = ({ show, open }) => {
  return (
    <div className="showToDo_container">
      <div className="showToDo">
        {show.title && <p>title: {show.title}</p>}
        {show.description && <p>description: {show.description}</p>}
        {show.createdAt && <p>createdAt: {show.createdAt}</p>}
        {show.finishedAt.length > 1 && <p>finishedAt: {show.finishedAt}</p>}
        {show.archiveAt.length > 1 && <p>archiveAt: {show.finishedAt}</p>}
      </div>
    </div>
  );
};

export default ShowToDo;
