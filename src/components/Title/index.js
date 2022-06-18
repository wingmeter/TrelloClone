import { MoreVert } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import ClickOutComponent from "react-onclickout";
import storeApi from "../../utils/storeApi";
import "./style.scss";

const Title = ({ title, listId }) => {
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const {updateListTitle, deleteList} = useContext(storeApi);

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId);
    setOpen((prev) => !prev);
  };

  return (
    <>
      {open ? (
        <div>
          <input
            type="text"
            className="input-title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleOnBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleOnBlur();
              }
              return;
            }}
          />
        </div>
      ) : (
        <div className="editable-title-container">
          <h2 className="editable-title" onClick={() => setOpen((prev) => !prev)}>{title}</h2>
          <button
            className="list-button"
            onClick={() => setOpenOptions((prev) => !prev)}
          >
            <MoreVert />
          </button>
          {openOptions && (
            <ClickOutComponent
              onClick={(e) => {
                setOpenOptions((prev) => !prev);
              }}
            >
              <ul className="menu-card">
                <li
                  onClick={() => {
                    setOpenOptions((curr) => !curr);
                    deleteList(listId);
                  }}
                >
                  Delete List
                </li>
                <li
                  onClick={() => {
                    setOpenOptions((curr) => !curr);
                    setOpen((prev) => !prev);
                  }}
                >
                  Edit Card title
                </li>
              </ul>
            </ClickOutComponent>
          )}
        </div>
      )}
    </>
  );
};

export default Title;
