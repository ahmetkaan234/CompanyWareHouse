import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import {
  updateInventoryAsync,
  updateInventory,
  deleteInventoryAsync,
  deleteInventories,
} from "../redux/WareHouseSlice/WareHouseSlice";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { notification } from "antd";

const InventoryForm = ({ item }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(true);
  const [dataid, setDataid] = useState("");
  const [value, setValue] = useState({ name: item.name });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.name.length < 3) {
      openNotification();
    }

    if (item.name !== value.name) {
      await dispatch(updateInventoryAsync({ name: value.name, id: dataid }));
      dispatch(updateInventory({ name: value.name, id: dataid }));
    }
  };

  const handleDelete = async (id, e) => {
    await dispatch(deleteInventoryAsync(id));
    dispatch(deleteInventories(id));
  };

  const handleEdit = (id) => {
    setVisible(!visible);
    setDataid(id);
  };

  useEffect(() => {
    setValue({ name: item.name });
  }, [item]);

  const openNotification = () => {
    notification.open({
      message: "ERROR",
      description: "name size cannot be less than 3",
      onClick: () => {
   
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="   flex   flex-col lg:flex-row   justify-between  items-start lg:items-center border-2 rounded-md border-teal-600 w-full mt-5  p-4"
      >
        <TextField
          id="outlined-basic"
          value={value.name}
          variant="outlined"
          onChange={(e) => setValue({ ...value, name: e.target.value })}
        />
        <div>
          <button
            onClick={() => {
              handleEdit(item._id);
            }}
            className="flex items-center justify-center h-[50px] w-[50px] mt-5  lg:mt-0 text-white bg-teal-600 rounded-lg "
          >
            <MdEdit />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleDelete(item._id)}
            className="flex items-center justify-center h-[50px] w-[50px]  mt-5 lg:mt-0 text-white bg-teal-600 rounded-lg "
          >
            <AiFillDelete />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
