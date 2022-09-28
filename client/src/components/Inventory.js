import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  getInventoryByWareHouse,
  addInventoryAsync,
} from "../redux/WareHouseSlice/WareHouseSlice";
import { useParams,Link } from "react-router-dom";
import InventoryForm from "./InventoryForm";
import {FaArrowAltCircleLeft} from 'react-icons/fa'

const Inventory = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  let { id } = useParams();
  const handleOk = async () => {
    setIsModalOpen(false);
    await dispatch(addInventoryAsync({ name: value, id: id }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getInventoryByWareHouse(id));
  }, [dispatch]);

  const inventories = useSelector((state) => state.warehouse.inventories);


  return (
    <div className="w-full min-h-screen  flex flex-col items-center">
      <div className=" flex flex-col w-5/12   mt-36">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-teal-600 ">
            {inventories.length > 0 &&
              inventories[0].warehouseid.name &&
              inventories[0].warehouseid.name}
          </p>
                <div className="flex justify-center items-center ">
                <Link to='/'>
            <p className="text-teal-600 text-xl" >  <FaArrowAltCircleLeft/> </p>
          </Link>

                </div>
         
        </div>

        <div>
          {inventories.map((item, index) => [
            <InventoryForm key={index} item={item} />,
          ])}
        </div>
        <form className="mt-5" onSubmit={handleSubmit} action="">
          <button
            onClick={showModal}
            className="h-[60px] w-[60px]  text-white mt-5 md:mt-0 bg-teal-600 rounded-lg"
          >
            ADD
          </button>
          <Modal
            title="Eklemek istediğiniz depo ismini yazınız ..."
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
        </form>
      </div>
    </div>
  );
};

export default Inventory;
