"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAI";
import { LoaderCircleIcon, LoaderIcon, LoaderPinwheel } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInter() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPos, setJobPosition] = useState();
  const [jobDesc, setJobDescription] = useState();
  const [jobExp, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonresponse, setjsonresponse] = useState([]);
  const route = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPos, jobDesc, jobExp);

    const InputPrompt = "Job Role :" + jobPos + " , Job Description :" + jobDesc + ", Years of Experience :" + jobExp + ". Based on this information please give me " + process.env.NEXT_PUBLIC_QC + " interview questions and answers in json format . Give Question annd Answer as fields in json.";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '');
    console.log(JSON.parse(MockJsonResponse));
    setjsonresponse(MockJsonResponse);

    if (MockJsonResponse) {
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResponse: MockJsonResponse,
          jobPosition: jobPos,
          jobDescription: jobDesc,
          jobExperience: jobExp,
          createdby: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY')
        }).returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID: ", resp);
      if (resp) {
        setOpenDialog(false);
        route.push('/dashboard/interview/' + resp[0]?.mockId);
      }
    } else {
      console.log("Error in response");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className=" border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center p-10 bg-secondary">new interview</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="mx-w-xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">About the job!</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Details about your job role and experience</h2>
                  <div className="mt-5 my-3">
                    <label>Role:</label>
                    <Input
                      placeholder="Example: Frontend Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Description:</label>
                    <Textarea
                      placeholder="Example : React, Angular"
                      required
                      onChange={(event) => setJobDescription(event.target.value)}
                    />
                  </div>
                  <div className="mt-5 my-3">
                    <label>Years of Experience:</label>
                    <Input
                      placeholder="Example: 5"
                      type="number"
                      max="10"
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 
                      <>
                        <LoaderPinwheel className="animate-spin" />
                      </> : 'Generate'
                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInter;
