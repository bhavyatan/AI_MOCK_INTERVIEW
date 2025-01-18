import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInter from './_components/AddNewInter'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-black'>Create your Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'> 
        <AddNewInter />

      </div>
      {/* Previous Interview List */}
      <InterviewList/>
    </div>
  )
}

export default Dashboard