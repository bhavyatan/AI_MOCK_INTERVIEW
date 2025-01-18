"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Webcam from 'react-webcam'



function Interview({params}) {
    const resolvedParams = React.use(params); 
    const [interviewData,setinterviewData]=useState();
    const [webcam,setwebcam]=useState(false);
    useEffect(() => {
        console.log(resolvedParams);
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,resolvedParams.interviewid))
        setinterviewData(result[0]);
        // console.log(result);
    }
  return (
    <div className='my-10 flex justify-center flex-col items-center'>
        <h2 className='font-semibold text-3xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-40'>
            <div className='flex flex-col my-5 gap-5'>
             <div className='flex flex-col p-5 rounded-lg border gap-5'>
             <h2 className='text-lg'><strong>Job Role : </strong>{interviewData?.jobPosition}</h2>
             <h2 className='text-lg'><strong>Requirements : </strong>{interviewData?.jobDescription}</h2>
             <h2 className='text-lg'><strong>Experience : </strong>{interviewData?.jobExperience}</h2>
             </div>
            </div>
         

       
        <div>
            {webcam ? <Webcam
            onUserMedia={()=>setwebcam(true)}
            onUserMediaError={()=>setwebcam(false)}
            mirrored={true}
            style={{
                width:'100%',
                height:300,
            }}
            />
            : 
            <>
            <WebcamIcon className=' h-72 w-full p-20 bg-secondary rounded-xl border my-3'  />
            <Button onClick={()=>setwebcam(true)} className='bg-black my-5 w-full text-white'> Enable Mic and Camera </Button>
            </>
            }
        </div>
        </div>
       
        
        <div>
             <Link href={'/dashboard/interview/'+resolvedParams.interviewid+'/start'}>  
             <Button className='bg-purple-900 text-white  my-10'>
             
               <strong>Start Interview!</strong> </Button>
               </Link>
               
            
            
        </div>

    </div>
    
  )
}

export default Interview