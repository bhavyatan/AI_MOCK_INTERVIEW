"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useReducer, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({params}) {

  const[feedbackList,setFeedbackList]=useState([]);
  const router =useRouter();

  const resolvedParams=React.use(params);
  useEffect(()=>{
    GetFeedback();
  },[])
  const GetFeedback=async()=>{
    const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdref,resolvedParams.interviewid))
    //.orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);

  }
  return (
    <div>
    <div className='p-10 '>
      {feedbackList?.length==0?
      <h2 className='text-2xl font-bold  flex justify-center text-black'>No Record Found!</h2>
      :
      <>
      <h2 className='text-purple-700 font-bold text-3xl flex flex-col items-center'>Congratulations! You have completed your interview.</h2>
      {/* <h2 className=' text-black font-semibold text-2xl  flex flex-col items-center my-2'>Here's your overall rating : </h2> */}
      <h2 className='font-bold my-5 text-lg text-purple-800'>Find the feedback below👇</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index} className='mt-6'>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between'>{item.question}<ChevronsUpDown/></CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-4'>
            <h2 className='text-purple-500 bg-purple-50 p-4 rounded-lg'><strong> Rating : {item.rating}</strong> </h2>
            <h2 className='bg-red-50 p-3 rounded-lg text-red-600'><strong>Recorded Answer : </strong>{item.userAns}</h2>
            <h2 className='bg-green-50 text-green-500 p-4 rounded-lg'><strong>Correct Answer :</strong>{item.correctAns} </h2>
            <h2 className='bg-blue-50 text-blue-500 p-4 rounded-lg '><strong>Feedback : </strong>{item.feedback}</h2>

          </div>
          
        </CollapsibleContent>
      </Collapsible>
     
      ))}
      </>}

      
    </div>

    <Button onClick={()=>router.replace('/dashboard')} className='bg-purple-800 place-items-center my-4'>Dashboard</Button>
    </div>
    
  );
}

export default Feedback;

