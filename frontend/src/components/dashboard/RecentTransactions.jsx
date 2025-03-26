/* eslint-disable no-unused-vars */
import React from 'react'
import { IoMdDocument } from 'react-icons/io'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Recent Transactions</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className="mt-6">
            {transactions?.map((item) => (
                <TransactionInfoCard 
                key={item._id}
                title={item.type == 'expense' ? item.category : item.source}
                icon={item.icon}
                date={moment(item.data).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
                />
            ))}

        </div>
    </div>
  )
}

export default RecentTransactions