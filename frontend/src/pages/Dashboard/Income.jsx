/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
const Income = () => {
const [incomeData, setIncomeData] = useState([]);
const [loading, setLoading] = useState(false)
const [openDeleteAlert, setOpenDeleteAlert] = useState({
  show: false,
  data: null
})
const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false)


//Get All Income Detail
const fetchIncomeDetail = async () => {
  if(loading) return;
  setLoading(true);

  try{
    const response = await axiosInstance.get(`${API_PATH.INCOME.GET_ALL_INCOME}`);

    if(response.data) {
      setIncomeData(response.data)
    }
  } catch (error) {
    console.log("Something went wrong. Please try again.", error)
  } finally {
    setLoading(false)
  }
};

useEffect(() => {
  fetchIncomeDetail();

  return () => {}
}, [])

//Handle Add Income
const handleAddIncome = async(income) => {};

//Delete Income
const deleteIncome = async(id) => {};

//handle download income details
const handleDownloadIncomeDetails = async () => {};

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income">
            {/* <AddIncomeForm onAddIncome={handleAddIncome} /> */}
        </Modal>
      </div>

    </DashboardLayout>
  )
}

export default Income