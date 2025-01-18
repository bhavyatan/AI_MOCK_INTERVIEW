'use client';
import Webcam from 'react-webcam';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, WebcamIcon } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAI';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { is } from 'drizzle-orm';

function RecordAnswerSection({
  mockQuestion,
  activeIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    if (userAnswer.length < 10) {
      setLoading(false);
      toast.error('Error while saving your answer, Please record again.🤦‍♂️');
      return;
    }

    setLoading(true);
    const feedbackPrompt =
      'Question:' +
      mockQuestion[activeIndex]?.Question +
      ', User Answer:' +
      userAnswer +
      ', depends on question and user answer for given interview question' +
      'please give us rating out of 10 for answer and feedback as area of improvement if any' +
      'in just 3 to 5 lines how to improve it in JSON format with rating field and feedback field' +
      'like {rating:, feedback: }';

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace('```json', '')
      .replace('```', '');
    console.log('feedback check:', mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);
    console.log('json feed', JsonFeedbackResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdref: interviewData?.mockId,
      question: mockQuestion[activeIndex]?.Question,
      correctAns: mockQuestion[activeIndex]?.Answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      //areasOfImprovement: JsonFeedbackResp?.areas_of_improvement,
      //howToImprove: JsonFeedbackResp?.how_to_improve,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-yyyy'),
    });

    if (resp) {
      toast.success('User Answer recorded successfully👍.');
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-gray-700 rounded-lg p-5'>
        <WebcamIcon
          width={200}
          height={200}
          className='absolute'
          color='white'
        />
        <Webcam
          mirrored={true}
          style={{
            height: 400,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>
      <Button 
        disabled={loading}
        variant='outline'
        className='my-10 bg-white'
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <strong><h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
            <StopCircle /> Stop Recording
          </h2></strong>
        ) : (
          <strong><h2 className='text-primary flex gap-1 items-center text-black'>
            <Mic /> Start Recording
          </h2></strong>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;