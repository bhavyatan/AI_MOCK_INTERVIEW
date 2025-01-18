"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

function InterviewList() {
    const{user}=useUser();
    const[interviewList,setInterviewList]=useState([]);
    
    useEffect(()=>{
        user&&GetList();

    },[user])

    const GetList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdby,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))
        console.log(result);
        setInterviewList(result);
    }
  return (

    
    <div>
        <h2 className='text-lg font-bold'> Previous Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4'>
            {interviewList&&interviewList.map((interview,index)=>(
                <InterviewCard
                interview={interview}
                key={index}
                />



            ))}
        </div>
    </div>

   
  )
}

export default InterviewList