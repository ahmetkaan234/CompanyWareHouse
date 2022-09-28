import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWarehouseAsync,
  addWareHouseAsync,
  addWareHouse
} from "../redux/WareHouseSlice/WareHouseSlice";
import { Modal } from "antd";
import TextField from "@mui/material/TextField";

import Form from "./Form";

const Warehouse = () => {
  const [value, setValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    await dispatch(addWareHouseAsync({ name: value }));
    dispatch(addWareHouse({name:value}))
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWarehouseAsync());
  }, [dispatch]);

  const data = useSelector((state) => state.warehouse.items);

  return (
    <div className="w-full min-h-screen   flex flex-col  justify-center items-center ">
      <div>
        <p className="text-3xl font-bold text-teal-600 ">WAREHOUSES</p>
      </div>

      <div className="w-full    flex flex-col  justify-center items-center">
        {data && data.map((item, index) => <Form key={index} item={item} />)}
      </div>
      <div className="flex justify-end w-5/12 mt-2">
        <button
          onClick={showModal}
          className="p-3 pr-6 pl-6 shadow-emerald-700 text-white mt-5 md:mt-0 bg-teal-600 rounded-lg"
        >
          ADD
        </button>
        <Modal
          title="Enter the name of the warehouse you want to add..."
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <TextField
            id="outlined-basic"
            label={`item name`}
            variant="outlined"
            onChange={(e) => setValue(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Warehouse;
