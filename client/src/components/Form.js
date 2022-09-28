import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateWareHouseAsync,
  deleteWareHouseAsync,
  getInventoryByWareHouse,
  removeWareHouses,
  addWareHouse,
} from "../redux/WareHouseSlice/WareHouseSlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";
import TextField from "@mui/material/TextField";

const Form = ({ item }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ name: item.name });

  const handleDelete = async () => {
    await dispatch(deleteWareHouseAsync(item._id));
    dispatch(removeWareHouses(item._id));
  };

  const handleVisible = async (e) => {
    e.preventDefault();
    if (item.name !== value.name) {
      await dispatch(updateWareHouseAsync({ name: value.name, id: item._id }));
      dispatch(addWareHouse({ _id: item._id, name: value.name }));
    }
  };

  useEffect(() => {
    dispatch(getInventoryByWareHouse(item._id));
  }, [dispatch]);

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await dispatch(updateWareHouseAsync({ name: value.name, id: item._id }));
    }
  };

  useEffect(() => {
    setValue({ name: item.name });
  }, [item]);

  return (
    <div
      key={item._id}
      className="flex   mt-10 lg:mt-5 flex-col  space-x-4 lg:flex-row justify-between md:w-5/12 p-10    border-2 rounded-md  border-teal-600  "
    >
      <div className="flex space-x-10  ">
        <TextField
          id="outlined-basic"
          label="Warehouses Name"
          value={value.name}
          variant="outlined"
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className=" w-1/9 ">
        <button
          onClick={() => handleDelete()}
          className="flex items-center justify-center h-[50px] w-[50px]  text-white mt-5 lg:mt-0 bg-teal-600 rounded-lg "
        >
          <AiFillDelete className="text-xl" />
        </button>
      </div>
      <div className=" w-1/9 ">
        <button
          onClick={handleVisible}
          className=" flex items-center justify-center h-[50px] w-[50px]   mt-5 lg:mt-0 text-white bg-teal-600 rounded-lg "
        >
          <MdEdit className="text-xl" />
        </button>
      </div>

      <div className=" flex  w-1/9">
        <Link to={`inventories/${item._id}`}>
          <button className=" flex items-center justify-center h-[50px] w-[50px]  text-white mt-5 lg:mt-0 bg-teal-600 rounded-lg ">
            <FaArrowAltCircleRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
