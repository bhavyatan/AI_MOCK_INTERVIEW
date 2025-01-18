import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCard({interview}) {

    const router=useRouter();
    

  return (
    <div className='border shadow-sm rounded-lg p-5 bg-secondary mt-5 '>
        <h2 className=' font-bold   rounded-lg' >
            {interview?.jobPosition}
        </h2>
        <h2 className=' font-bold   rounded-lg' >
            Years of Experience : {interview?.jobExperience} 
        </h2>
        <h2 className=' font-bold   rounded-lg' >
            {interview.createdAt}
        </h2>
        <div className=' flex justify-between  gap-5 mt-2'>
            <Button variant="outline" size={"sm"} className='font-serif font-semibold bg-black text-white w-full'
            onClick={()=>router.push('dashboard/interview/'+interview?.mockId+'/feedback')} >Feedback</Button>
            <Button className='bg-purple-800 text-white font-serif font-semibold w-full'
            onClick={()=>router.push('/dashboard/interview/'+interview?.mockId)}>Start</Button>

        </div>

    </div>
  )
}

export default InterviewCard