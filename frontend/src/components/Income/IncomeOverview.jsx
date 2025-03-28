/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result)

        return () => {}
    }, [transactions])
  return (
    <div className="card">
        <div className="flex justify-between items-center">
            <div className="">
                <h5 className="text-lg">Income Overview</h5>
                <p className="text-gray-400 text-xs mt-0.5">
                    Track Your earnings over time and analyze yoyr income !!
                </p>
            </div>

            <button className="add-btn" onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
            </button>
        </div>

        <div className="mt-10">
            <CustomBarChart data={chartData}/>
        </div>
    </div>
  )
}

export default IncomeOverview