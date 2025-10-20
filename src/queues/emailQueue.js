import Queue from 'bull';
import dotenv from 'dotenv';
dotenv.config();

// Create email queue
export const emailQueue = new Queue('email', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
});

// Add job to queue
export const addEmailJob = async (emailData) => {
  try {
    const job = await emailQueue.add(emailData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
    console.log(`📬 Email job added to queue: ${job.id}`);
    return job;
  } catch (error) {
    console.error('❌ Failed to add email job:', error);
    throw error;
  }
};
