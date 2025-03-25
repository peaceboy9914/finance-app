import React from 'react'
import {getCharName} from '../../utils/helper'

const CharProfile = ({fullname}) => {
  return (
    <div className='w-20 h-20 bg-gray-400 rounded-full flex justify-center items-center text-2xl text-gray-900 font-medium'>
        {getCharName(fullname)}
    </div>
  )
}

export default CharProfile