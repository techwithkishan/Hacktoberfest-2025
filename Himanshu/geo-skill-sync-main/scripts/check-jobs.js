import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ociivtzldmbnnlbjmzvc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jaWl2dHpsZG1ibm5sYmptenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODc0MDgsImV4cCI6MjA3Mzk2MzQwOH0.S6B23P_Oyo_ak2Ujm_oTmz0M5zJSaVgbNnHlClT5llg";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkJobs() {
  try {
    console.log("Checking jobs in Supabase database...");
    
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error("Error fetching jobs:", error);
      return;
    }
    
    console.log(`Found ${data.length} jobs in database`);
    
    if (data.length === 0) {
      console.log("No jobs found. You need to add jobs to Supabase first.");
      console.log("Follow the instructions in SUPABASE_SETUP.md");
    } else {
      console.log("Sample jobs:");
      data.forEach((job, index) => {
        console.log(`${index + 1}. ${job.title} at ${job.company} in ${job.location}`);
      });
    }
    
  } catch (error) {
    console.error("Error checking jobs:", error);
  }
}

checkJobs();

