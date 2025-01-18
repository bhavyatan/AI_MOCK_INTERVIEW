"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Questions from './_components/Questions';
import RecordAns from './_components/RecordAns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function StartInterview({params}) {
    const resolvedParams=React.use(params);
    const [interviewData, setInterviewData] = useState();
    const [mockQuestion, setMockQuestion] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails=async()=>{
      const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,resolvedParams.interviewid))
      const jsonMockResp=JSON.parse(result[0].jsonMockResponse)
      console.log(jsonMockResp);
      setMockQuestion(jsonMockResp);
      setInterviewData(result[0]);
      // console.log(result);
    }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <Questions mockQuestion={mockQuestion}
            activeIndex={activeIndex}/>

            {/* Video/Audio Recording */}
            <RecordAns
            mockQuestion={mockQuestion}
            activeIndex={activeIndex}
            interviewData={interviewData}/>


         
        </div>
        <div className='flex justify-around gap-5'>
          {activeIndex>0&&<Button  className='bg-slate-500 text-white' onClick={()=>setActiveIndex(activeIndex-1)}><strong>Previous Question</strong></Button>}
          {activeIndex!=mockQuestion?.length-1&&<Button className='bg-slate-500 text-white' onClick={()=>setActiveIndex(activeIndex+1)}><strong>Next Question</strong></Button>}
          {activeIndex == mockQuestion?.length - 1 && (
            <Link
              href={
                '/dashboard/interview/'+interviewData?.mockId+'/feedback'
              }
            >
              <Button  className='bg-slate-500 text-white'>End Interview</Button>
            </Link>
          )}
        </div>
     </div>
  );
}

export default StartInterview