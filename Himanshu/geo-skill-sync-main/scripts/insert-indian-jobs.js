import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ociivtzldmbnnlbjmzvc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jaWl2dHpsZG1ibm5sYmptenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODc0MDgsImV4cCI6MjA3Mzk2MzQwOH0.S6B23P_Oyo_ak2Ujm_oTmz0M5zJSaVgbNnHlClT5llg";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sample Indian jobs data
const indianJobs = [
  {
    title: "Software Engineer",
    company: "Tata Consultancy Services",
    location: "Mumbai, Maharashtra",
    latitude: 19.0760,
    longitude: 72.8777,
    salary_min: 600000,
    salary_max: 900000,
    salary_display: "₹6L - ₹9L",
    job_type: "Full-time",
    description: "Join TCS as a Software Engineer and work on cutting-edge projects. We are looking for passionate developers who can contribute to our innovative solutions.",
    skills: ["Java", "Spring Boot", "Microservices", "AWS", "Docker"],
    posted_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    is_remote: false,
    external_url: "https://tcs.com/careers/software-engineer",
    source: "indian_job_board"
  },
  {
    title: "Senior React Developer",
    company: "Infosys",
    location: "Mumbai, Maharashtra",
    latitude: 19.0760,
    longitude: 72.8777,
    salary_min: 800000,
    salary_max: 1200000,
    salary_display: "₹8L - ₹12L",
    job_type: "Full-time",
    description: "Infosys is seeking a Senior React Developer to join our dynamic team. Work on modern web applications and cutting-edge technologies.",
    skills: ["React", "TypeScript", "Redux", "Node.js", "MongoDB"],
    posted_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    is_remote: false,
    external_url: "https://infosys.com/careers/senior-react-developer",
    source: "indian_job_board"
  },
  {
    title: "Full Stack Developer",
    company: "Wipro",
    location: "Mumbai, Maharashtra",
    latitude: 19.0760,
    longitude: 72.8777,
    salary_min: 700000,
    salary_max: 1100000,
    salary_display: "₹7L - ₹11L",
    job_type: "Full-time",
    description: "Wipro is looking for a Full Stack Developer to join our growing team. Work on exciting projects and be part of our digital transformation journey.",
    skills: ["JavaScript", "Node.js", "React", "PostgreSQL", "AWS"],
    posted_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_remote: false,
    external_url: "https://wipro.com/careers/full-stack-developer",
    source: "indian_job_board"
  },
  {
    title: "Data Scientist",
    company: "HCL Technologies",
    location: "Delhi, Delhi",
    latitude: 28.7041,
    longitude: 77.1025,
    salary_min: 900000,
    salary_max: 1400000,
    salary_display: "₹9L - ₹14L",
    job_type: "Full-time",
    description: "HCL is seeking a Data Scientist to join our AI/ML team. Work on machine learning models and data analysis projects.",
    skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL"],
    posted_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_remote: false,
    external_url: "https://hcl.com/careers/data-scientist",
    source: "indian_job_board"
  },
  {
    title: "DevOps Engineer",
    company: "Tech Mahindra",
    location: "Delhi, Delhi",
    latitude: 28.7041,
    longitude: 77.1025,
    salary_min: 800000,
    salary_max: 1300000,
    salary_display: "₹8L - ₹13L",
    job_type: "Full-time",
    description: "Tech Mahindra is looking for a DevOps Engineer to manage our cloud infrastructure and deployment pipelines.",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    posted_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    is_remote: false,
    external_url: "https://techmahindra.com/careers/devops-engineer",
    source: "indian_job_board"
  }
];

async function insertJobs() {
  try {
    console.log("Starting to insert Indian jobs...");
    
    for (let i = 0; i < indianJobs.length; i++) {
      const job = indianJobs[i];
      console.log(`Inserting job ${i + 1}: ${job.title} at ${job.company}`);
      
      const { data, error } = await supabase
        .from('jobs')
        .insert([job]);
      
      if (error) {
        console.error(`Error inserting job ${i + 1}:`, error);
      } else {
        console.log(`Job ${i + 1} inserted successfully`);
      }
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log("Finished inserting jobs!");
    
  } catch (error) {
    console.error("Error inserting jobs:", error);
  }
}

insertJobs();

