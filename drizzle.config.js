/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:37WiAwFvzjPl@ep-snowy-resonance-a7yfj2j5.ap-southeast-2.aws.neon.tech/interview_mocker?sslmode=require',
    }
  };