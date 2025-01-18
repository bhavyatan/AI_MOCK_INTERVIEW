//"use client"
import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function Questions({mockQuestion,activeIndex}) {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);


    }
    else{
      alert('Your browser does not support text to speech')
    }
  }

  return mockQuestion&&(
     <div className='p-5 border rounded-lg my-10 '>
         <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockQuestion&&mockQuestion.map((question,index)=>(
                <h2 key={index+1} className={`p-2 bg-secondary rounded-full 
                text-xs md:text-sm  text-center cursor-pointer
                ${activeIndex==index&&'bg-slate-500 text-white'}`}>Question {index+1}. </h2>


            ))}
         </div>
            
         <h2 className='my-5 text-md md:text-lg'>{mockQuestion[activeIndex]?.Question}</h2>
         <Volume2  onClick={()=>textToSpeech(mockQuestion[activeIndex]?.Question)} className='cursor-pointer' />
            
           <div  className='border rounded-lg p-5 bg-yellow-100 my-3'>
              <h2 className='flex gap-2 items-center  text-sm'>
                <Lightbulb  className='text-yellow-500' />
                <strong>Click on 'Start Recording' when you want to record the answer.</strong>
              </h2>
              
            </div>
      </div>
    
  )
}

export default Questions