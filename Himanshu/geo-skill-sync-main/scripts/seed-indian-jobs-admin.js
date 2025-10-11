import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ociivtzldmbnnlbjmzvc.supabase.co";
// Using service role key to bypass RLS
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jaWl2dHpsZG1ibm5sYmptenZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODM4NzQwOCwiZXhwIjoyMDczOTYzNDA4fQ.YourServiceRoleKeyHere";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Indian cities with coordinates
const indianCities = [
  { name: "Mumbai, Maharashtra", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi, Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Bangalore, Karnataka", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad, Telangana", lat: 17.3850, lng: 78.4867 },
  { name: "Chennai, Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { name: "Pune, Maharashtra", lat: 18.5204, lng: 73.8567 },
  { name: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639 },
  { name: "Ahmedabad, Gujarat", lat: 23.0225, lng: 72.5714 },
  { name: "Gurgaon, Haryana", lat: 28.4595, lng: 77.0266 },
  { name: "Noida, Uttar Pradesh", lat: 28.5355, lng: 77.3910 },
  { name: "Kochi, Kerala", lat: 9.9312, lng: 76.2673 },
  { name: "Chandigarh, Chandigarh", lat: 30.7333, lng: 76.7794 },
  { name: "Indore, Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
  { name: "Jaipur, Rajasthan", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow, Uttar Pradesh", lat: 26.8467, lng: 80.9462 }
];

// Indian companies
const indianCompanies = [
  "Tata Consultancy Services", "Infosys", "Wipro", "HCL Technologies", "Tech Mahindra",
  "Accenture India", "Capgemini", "Cognizant", "IBM India", "Microsoft India",
  "Google India", "Amazon India", "Flipkart", "Paytm", "Zomato",
  "Swiggy", "Ola", "Uber India", "Byju's", "Unacademy",
  "Reliance Jio", "Airtel", "Vodafone Idea", "Bharti Airtel", "Jio Platforms",
  "Adani Group", "Reliance Industries", "Tata Group", "Mahindra Group", "Bajaj Group",
  "Larsen & Toubro", "ITC Limited", "HDFC Bank", "ICICI Bank", "State Bank of India",
  "Axis Bank", "Kotak Mahindra Bank", "Yes Bank", "IndusInd Bank", "Punjab National Bank",
  "MakeMyTrip", "OYO", "PolicyBazaar", "PhonePe", "Razorpay",
  "Freshworks", "Zoho", "BrowserStack", "Postman", "Chargebee"
];

// Job titles
const jobTitles = [
  "Software Engineer", "Senior Software Engineer", "Full Stack Developer", "Frontend Developer",
  "Backend Developer", "DevOps Engineer", "Data Scientist", "Data Analyst", "Machine Learning Engineer",
  "Product Manager", "Project Manager", "Technical Lead", "Solution Architect", "Cloud Engineer",
  "Mobile App Developer", "React Developer", "Node.js Developer", "Python Developer", "Java Developer",
  "UI/UX Designer", "Graphic Designer", "Digital Marketing Manager", "Sales Manager", "Business Analyst",
  "Quality Assurance Engineer", "Test Engineer", "System Administrator", "Database Administrator",
  "Cybersecurity Analyst", "Network Engineer", "IT Support Specialist", "Content Writer", "SEO Specialist",
  "HR Manager", "Recruitment Specialist", "Operations Manager", "Finance Manager", "Accountant",
  "Customer Success Manager", "Business Development Manager", "Marketing Executive", "Content Creator"
];

// Skills
const skills = [
  "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js", "Express.js",
  "Python", "Django", "Flask", "FastAPI", "Java", "Spring Boot", "C#", ".NET",
  "PHP", "Laravel", "Ruby", "Rails", "Go", "Rust", "C++", "C", "Swift", "Kotlin",
  "HTML", "CSS", "Sass", "Tailwind CSS", "Bootstrap", "Material UI", "Ant Design",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "DynamoDB", "SQLite",
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "GitLab CI",
  "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", "Slack", "Trello",
  "Figma", "Adobe Creative Suite", "Sketch", "InVision", "Zeplin", "Canva",
  "Tableau", "Power BI", "Excel", "Google Analytics", "Mixpanel", "Amplitude",
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
  "Agile", "Scrum", "Kanban", "DevOps", "CI/CD", "Microservices", "REST API", "GraphQL"
];

// Job types
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];

// Generate random job data
function generateRandomJob() {
  const city = indianCities[Math.floor(Math.random() * indianCities.length)];
  const company = indianCompanies[Math.floor(Math.random() * indianCompanies.length)];
  const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
  const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
  
  // Generate random skills (3-8 skills per job)
  const numSkills = Math.floor(Math.random() * 6) + 3;
  const jobSkills = [];
  for (let i = 0; i < numSkills; i++) {
    const skill = skills[Math.floor(Math.random() * skills.length)];
    if (!jobSkills.includes(skill)) {
      jobSkills.push(skill);
    }
  }
  
  // Generate salary range based on job level
  const isSenior = title.includes("Senior") || title.includes("Lead") || title.includes("Manager");
  const salaryMin = isSenior ? Math.floor(Math.random() * 800000) + 800000 : Math.floor(Math.random() * 500000) + 300000;
  const salaryMax = salaryMin + Math.floor(Math.random() * 500000) + 200000;
  
  // Random remote work (30% chance)
  const isRemote = Math.random() < 0.3;
  
  // Generate description
  const descriptions = [
    `Join our dynamic team at ${company} as a ${title}. We are looking for a passionate individual who can contribute to our innovative projects and help us build cutting-edge solutions.`,
    `We are seeking a talented ${title} to join ${company}. The ideal candidate will have strong technical skills and a passion for technology. You will work on exciting projects and have opportunities for growth.`,
    `${company} is looking for a ${title} to join our growing team. This is an excellent opportunity to work with modern technologies and be part of a collaborative environment.`,
    `Join ${company} as a ${title} and be part of our mission to deliver exceptional software solutions. We offer competitive compensation and a great work culture.`,
    `We are hiring a ${title} at ${company}. The role involves working on challenging projects and collaborating with cross-functional teams to deliver high-quality solutions.`
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  // Generate posted date (within last 30 days)
  const postedDate = new Date();
  postedDate.setDate(postedDate.getDate() - Math.floor(Math.random() * 30));
  
  return {
    title,
    company,
    location: city.name,
    latitude: city.lat,
    longitude: city.lng,
    salary_min: salaryMin,
    salary_max: salaryMax,
    salary_display: `₹${(salaryMin / 100000).toFixed(1)}L - ₹${(salaryMax / 100000).toFixed(1)}L`,
    job_type: jobType,
    description,
    skills: jobSkills,
    posted_date: postedDate.toISOString(),
    is_remote: isRemote,
    external_url: `https://${company.toLowerCase().replace(/\s+/g, '')}.com/careers/${title.toLowerCase().replace(/\s+/g, '-')}`,
    source: "indian_job_board"
  };
}

// Main function to seed jobs
async function seedIndianJobs() {
  try {
    console.log("Starting to seed Indian jobs...");
    
    // Generate 60 jobs
    const jobs = [];
    for (let i = 0; i < 60; i++) {
      jobs.push(generateRandomJob());
    }
    
    console.log(`Generated ${jobs.length} jobs`);
    
    // Insert jobs into Supabase
    const { data, error } = await supabase
      .from('jobs')
      .insert(jobs);
    
    if (error) {
      console.error("Error inserting jobs:", error);
      return;
    }
    
    console.log("Successfully seeded Indian jobs!");
    console.log(`Inserted ${jobs.length} jobs into the database`);
    
    // Show some statistics
    const cities = [...new Set(jobs.map(job => job.location))];
    const companies = [...new Set(jobs.map(job => job.company))];
    const remoteJobs = jobs.filter(job => job.is_remote).length;
    
    console.log("\nJob Statistics:");
    console.log(`- Cities: ${cities.length} (${cities.slice(0, 5).join(", ")}...)`);
    console.log(`- Companies: ${companies.length} (${companies.slice(0, 5).join(", ")}...)`);
    console.log(`- Remote jobs: ${remoteJobs}`);
    console.log(`- On-site jobs: ${jobs.length - remoteJobs}`);
    
  } catch (error) {
    console.error("Error seeding jobs:", error);
  }
}

// Run the seeding
seedIndianJobs();

