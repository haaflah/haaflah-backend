import { emailQueue } from '../queues/emailQueue.js';
import { sendEmail } from '../utils/sendEmail.js';

// Process email jobs
emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  
  console.log(`📨 Processing email job ${job.id} for ${to}`);
  
  try {
    await sendEmail({ to, subject, html });
    console.log(`✅ Email sent successfully: ${job.id}`);
    return { success: true, messageId: job.id };
  } catch (error) {
    console.error(`❌ Email job ${job.id} failed:`, error);
    throw error; // This will trigger retry
  }
});

// Event listeners for monitoring
emailQueue.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed successfully`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed after all attempts:`, err.message);
});

emailQueue.on('stalled', (job) => {
  console.warn(`⚠️ Job ${job.id} stalled`);
});

console.log('📧 Email worker started and listening for jobs...');

export default emailQueue;
