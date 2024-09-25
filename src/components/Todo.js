import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Remove, Update } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const Todo = () => {
  const { userData } = useSelector((state) => state.todoreducers);

  const dispatch = useDispatch();

  const [showeye, setShoweye] = useState(false);

  const [showeyevalue, setShoweyeValue] = useState("");

  const [show, setShow] = useState(false);

  const [update, setUpdate] = useState("");

  const [index, setIndex] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (element) => {
    setShow(true);
    setUpdate(element);
  };

  const remove = (id) => {
    dispatch(Remove(id));
    //alert("Task successfully removed!");
  };

  const taskUpdate = () => {
    dispatch(Update(update, index));
    handleClose();
    //alert("Task successfully updated!");
  };

  return (
    <>
      <div className="todo_data col-lg-5 mx-auto mt-2">
        {userData.map((element, k) => {
          return (
            <>
              <div
                className="todo_container mb-2 d-flex justify-content-between align-items-center px-2"
                key={k}
                style={{
                  background: "lavender",
                  borderRadius: "3px",
                  height: "45px",
                }}
              >
                <li style={{ listStyle: "none" }}>{element}</li>
                <div className="edit_dlt col-lg-2 py-2 d-flex justify-content-between align-items-center">
                  <ModeEditIcon
                    onClick={() => {
                      handleShow(element);
                      setIndex(k);
                    }}
                    style={{ color: "darkgreen", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    onClick={() => remove(k)}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                  <RemoveRedEyeIcon
                    onClick={() => {
                      setShoweye(true);
                      setShoweyeValue(element);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </>
          );
        })}

        {/* eye modal */}
        <Modal show={showeye}>
          <h2 className="text-center mt-2">{showeyevalue}</h2>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShoweye(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* update modal */}
        <Modal show={show} onHide={handleClose}>
          <h3 className="text-center mt-2">Update Your Task</h3>
          <Modal.Header>
            <div className="todo col-lg-5 mx-auto d-flex justify-content-between align-items-center">
              <input
                name="task"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                className="form-control col-lg-5 mt-2"
              />
            </div>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              style={{ background: "indigo" }}
              onClick={() => taskUpdate()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Todo;
