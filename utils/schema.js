
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResponse:text('jsonMockResp'),
    jobPosition:varchar('jobPos'),
    jobDescription:varchar('jobDesc'),
    jobExperience:varchar('jobExp'),
    createdby:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull(),


})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdref:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    userAns:text('userAns'),
    correctAns:text('correctAns').notNull(),
    feedback:text('feedback').notNull(),
    rating:varchar('rating'),
    userEmail:varchar('userEmail').notNull(),
    createdAt:varchar('createdAt'),

})