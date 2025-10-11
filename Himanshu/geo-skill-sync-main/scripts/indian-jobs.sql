-- Insert 60+ Indian jobs into the jobs table
-- This script can be run directly in Supabase SQL editor

INSERT INTO public.jobs (title, company, location, latitude, longitude, salary_min, salary_max, salary_display, job_type, description, skills, posted_date, is_remote, external_url, source) VALUES

-- Mumbai Jobs
('Software Engineer', 'Tata Consultancy Services', 'Mumbai, Maharashtra', 19.0760, 72.8777, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'Join TCS as a Software Engineer and work on cutting-edge projects. We are looking for passionate developers who can contribute to our innovative solutions.', ARRAY['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'], NOW() - INTERVAL '5 days', false, 'https://tcs.com/careers/software-engineer', 'indian_job_board'),

('Senior React Developer', 'Infosys', 'Mumbai, Maharashtra', 19.0760, 72.8777, 800000, 1200000, '₹8L - ₹12L', 'Full-time', 'Infosys is seeking a Senior React Developer to join our dynamic team. Work on modern web applications and cutting-edge technologies.', ARRAY['React', 'TypeScript', 'Redux', 'Node.js', 'MongoDB'], NOW() - INTERVAL '3 days', false, 'https://infosys.com/careers/senior-react-developer', 'indian_job_board'),

('Full Stack Developer', 'Wipro', 'Mumbai, Maharashtra', 19.0760, 72.8777, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Wipro is looking for a Full Stack Developer to join our growing team. Work on exciting projects and be part of our digital transformation journey.', ARRAY['JavaScript', 'Node.js', 'React', 'PostgreSQL', 'AWS'], NOW() - INTERVAL '7 days', false, 'https://wipro.com/careers/full-stack-developer', 'indian_job_board'),

-- Delhi Jobs
('Data Scientist', 'HCL Technologies', 'Delhi, Delhi', 28.7041, 77.1025, 900000, 1400000, '₹9L - ₹14L', 'Full-time', 'HCL is seeking a Data Scientist to join our AI/ML team. Work on machine learning models and data analysis projects.', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'], NOW() - INTERVAL '2 days', false, 'https://hcl.com/careers/data-scientist', 'indian_job_board'),

('DevOps Engineer', 'Tech Mahindra', 'Delhi, Delhi', 28.7041, 77.1025, 800000, 1300000, '₹8L - ₹13L', 'Full-time', 'Tech Mahindra is looking for a DevOps Engineer to manage our cloud infrastructure and deployment pipelines.', ARRAY['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'], NOW() - INTERVAL '4 days', false, 'https://techmahindra.com/careers/devops-engineer', 'indian_job_board'),

('Product Manager', 'Accenture India', 'Delhi, Delhi', 28.7041, 77.1025, 1200000, 1800000, '₹12L - ₹18L', 'Full-time', 'Accenture is seeking a Product Manager to lead product strategy and roadmap. Work with cross-functional teams to deliver great products.', ARRAY['Product Management', 'Agile', 'Analytics', 'User Research', 'Strategy'], NOW() - INTERVAL '6 days', false, 'https://accenture.com/careers/product-manager', 'indian_job_board'),

-- Bangalore Jobs
('Frontend Developer', 'Capgemini', 'Bangalore, Karnataka', 12.9716, 77.5946, 650000, 950000, '₹6.5L - ₹9.5L', 'Full-time', 'Capgemini is looking for a Frontend Developer to create beautiful and responsive user interfaces.', ARRAY['React', 'Vue.js', 'CSS', 'JavaScript', 'TypeScript'], NOW() - INTERVAL '1 day', false, 'https://capgemini.com/careers/frontend-developer', 'indian_job_board'),

('Backend Developer', 'Cognizant', 'Bangalore, Karnataka', 12.9716, 77.5946, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Cognizant is seeking a Backend Developer to build scalable server-side applications and APIs.', ARRAY['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis'], NOW() - INTERVAL '8 days', false, 'https://cognizant.com/careers/backend-developer', 'indian_job_board'),

('Cloud Engineer', 'IBM India', 'Bangalore, Karnataka', 12.9716, 77.5946, 900000, 1400000, '₹9L - ₹14L', 'Full-time', 'IBM is looking for a Cloud Engineer to design and implement cloud solutions using AWS and Azure.', ARRAY['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'], NOW() - INTERVAL '3 days', false, 'https://ibm.com/careers/cloud-engineer', 'indian_job_board'),

-- Hyderabad Jobs
('Mobile App Developer', 'Microsoft India', 'Hyderabad, Telangana', 17.3850, 78.4867, 800000, 1200000, '₹8L - ₹12L', 'Full-time', 'Microsoft is seeking a Mobile App Developer to create innovative mobile applications for iOS and Android.', ARRAY['React Native', 'Swift', 'Kotlin', 'Flutter', 'Xamarin'], NOW() - INTERVAL '5 days', false, 'https://microsoft.com/careers/mobile-app-developer', 'indian_job_board'),

('UI/UX Designer', 'Google India', 'Hyderabad, Telangana', 17.3850, 78.4867, 1000000, 1500000, '₹10L - ₹15L', 'Full-time', 'Google is looking for a UI/UX Designer to create intuitive and beautiful user experiences.', ARRAY['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research', 'Prototyping'], NOW() - INTERVAL '2 days', false, 'https://google.com/careers/ui-ux-designer', 'indian_job_board'),

('Data Analyst', 'Amazon India', 'Hyderabad, Telangana', 17.3850, 78.4867, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'Amazon is seeking a Data Analyst to analyze business data and provide insights for decision making.', ARRAY['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'], NOW() - INTERVAL '7 days', false, 'https://amazon.com/careers/data-analyst', 'indian_job_board'),

-- Chennai Jobs
('Java Developer', 'Flipkart', 'Chennai, Tamil Nadu', 13.0827, 80.2707, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Flipkart is looking for a Java Developer to build scalable e-commerce solutions.', ARRAY['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'Redis'], NOW() - INTERVAL '4 days', false, 'https://flipkart.com/careers/java-developer', 'indian_job_board'),

('Python Developer', 'Paytm', 'Chennai, Tamil Nadu', 13.0827, 80.2707, 650000, 1000000, '₹6.5L - ₹10L', 'Full-time', 'Paytm is seeking a Python Developer to work on fintech solutions and payment systems.', ARRAY['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Docker'], NOW() - INTERVAL '6 days', false, 'https://paytm.com/careers/python-developer', 'indian_job_board'),

('QA Engineer', 'Zomato', 'Chennai, Tamil Nadu', 13.0827, 80.2707, 500000, 800000, '₹5L - ₹8L', 'Full-time', 'Zomato is looking for a QA Engineer to ensure quality of our food delivery platform.', ARRAY['Selenium', 'Jest', 'Cypress', 'API Testing', 'Manual Testing'], NOW() - INTERVAL '9 days', false, 'https://zomato.com/careers/qa-engineer', 'indian_job_board'),

-- Pune Jobs
('React Developer', 'Swiggy', 'Pune, Maharashtra', 18.5204, 73.8567, 600000, 950000, '₹6L - ₹9.5L', 'Full-time', 'Swiggy is seeking a React Developer to build user-friendly interfaces for our food delivery app.', ARRAY['React', 'Redux', 'JavaScript', 'CSS', 'HTML'], NOW() - INTERVAL '3 days', false, 'https://swiggy.com/careers/react-developer', 'indian_job_board'),

('Node.js Developer', 'Ola', 'Pune, Maharashtra', 18.5204, 73.8567, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Ola is looking for a Node.js Developer to build scalable backend services for our ride-sharing platform.', ARRAY['Node.js', 'Express.js', 'MongoDB', 'Redis', 'AWS'], NOW() - INTERVAL '5 days', false, 'https://ola.com/careers/nodejs-developer', 'indian_job_board'),

('Machine Learning Engineer', 'Uber India', 'Pune, Maharashtra', 18.5204, 73.8567, 1000000, 1600000, '₹10L - ₹16L', 'Full-time', 'Uber is seeking a Machine Learning Engineer to work on AI models for our transportation platform.', ARRAY['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'], NOW() - INTERVAL '2 days', false, 'https://uber.com/careers/ml-engineer', 'indian_job_board'),

-- Kolkata Jobs
('Frontend Developer', 'Byju''s', 'Kolkata, West Bengal', 22.5726, 88.3639, 550000, 850000, '₹5.5L - ₹8.5L', 'Full-time', 'Byju''s is looking for a Frontend Developer to create engaging educational interfaces.', ARRAY['React', 'Vue.js', 'CSS', 'JavaScript', 'TypeScript'], NOW() - INTERVAL '7 days', false, 'https://byjus.com/careers/frontend-developer', 'indian_job_board'),

('Backend Developer', 'Unacademy', 'Kolkata, West Bengal', 22.5726, 88.3639, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'Unacademy is seeking a Backend Developer to build scalable educational platforms.', ARRAY['Python', 'Django', 'PostgreSQL', 'Redis', 'AWS'], NOW() - INTERVAL '4 days', false, 'https://unacademy.com/careers/backend-developer', 'indian_job_board'),

('UI Designer', 'Reliance Jio', 'Kolkata, West Bengal', 22.5726, 88.3639, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Reliance Jio is looking for a UI Designer to create beautiful mobile and web interfaces.', ARRAY['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'], NOW() - INTERVAL '6 days', false, 'https://jio.com/careers/ui-designer', 'indian_job_board'),

-- Ahmedabad Jobs
('Full Stack Developer', 'Airtel', 'Ahmedabad, Gujarat', 23.0225, 72.5714, 650000, 1000000, '₹6.5L - ₹10L', 'Full-time', 'Airtel is seeking a Full Stack Developer to work on telecom solutions and digital platforms.', ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'], NOW() - INTERVAL '8 days', false, 'https://airtel.com/careers/full-stack-developer', 'indian_job_board'),

('DevOps Engineer', 'Vodafone Idea', 'Ahmedabad, Gujarat', 23.0225, 72.5714, 800000, 1200000, '₹8L - ₹12L', 'Full-time', 'Vodafone Idea is looking for a DevOps Engineer to manage cloud infrastructure and CI/CD pipelines.', ARRAY['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'], NOW() - INTERVAL '3 days', false, 'https://vodafoneidea.com/careers/devops-engineer', 'indian_job_board'),

('Data Scientist', 'Bharti Airtel', 'Ahmedabad, Gujarat', 23.0225, 72.5714, 900000, 1400000, '₹9L - ₹14L', 'Full-time', 'Bharti Airtel is seeking a Data Scientist to work on analytics and machine learning projects.', ARRAY['Python', 'R', 'Machine Learning', 'SQL', 'Tableau'], NOW() - INTERVAL '5 days', false, 'https://airtel.com/careers/data-scientist', 'indian_job_board'),

-- Gurgaon Jobs
('Senior Software Engineer', 'Jio Platforms', 'Gurgaon, Haryana', 28.4595, 77.0266, 1000000, 1500000, '₹10L - ₹15L', 'Full-time', 'Jio Platforms is looking for a Senior Software Engineer to lead development of digital solutions.', ARRAY['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'], NOW() - INTERVAL '2 days', false, 'https://jioplatforms.com/careers/senior-software-engineer', 'indian_job_board'),

('Product Manager', 'Adani Group', 'Gurgaon, Haryana', 28.4595, 77.0266, 1200000, 1800000, '₹12L - ₹18L', 'Full-time', 'Adani Group is seeking a Product Manager to drive product strategy and innovation.', ARRAY['Product Management', 'Strategy', 'Analytics', 'Agile', 'Leadership'], NOW() - INTERVAL '7 days', false, 'https://adanigroup.com/careers/product-manager', 'indian_job_board'),

('Cloud Architect', 'Reliance Industries', 'Gurgaon, Haryana', 28.4595, 77.0266, 1500000, 2200000, '₹15L - ₹22L', 'Full-time', 'Reliance Industries is looking for a Cloud Architect to design and implement cloud solutions.', ARRAY['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'], NOW() - INTERVAL '4 days', false, 'https://ril.com/careers/cloud-architect', 'indian_job_board'),

-- Noida Jobs
('React Native Developer', 'Tata Group', 'Noida, Uttar Pradesh', 28.5355, 77.3910, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Tata Group is seeking a React Native Developer to build cross-platform mobile applications.', ARRAY['React Native', 'JavaScript', 'TypeScript', 'Redux', 'Firebase'], NOW() - INTERVAL '6 days', false, 'https://tata.com/careers/react-native-developer', 'indian_job_board'),

('Python Developer', 'Mahindra Group', 'Noida, Uttar Pradesh', 28.5355, 77.3910, 650000, 1000000, '₹6.5L - ₹10L', 'Full-time', 'Mahindra Group is looking for a Python Developer to work on automotive technology solutions.', ARRAY['Python', 'Django', 'Flask', 'PostgreSQL', 'Docker'], NOW() - INTERVAL '9 days', false, 'https://mahindra.com/careers/python-developer', 'indian_job_board'),

('UI/UX Designer', 'Bajaj Group', 'Noida, Uttar Pradesh', 28.5355, 77.3910, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'Bajaj Group is seeking a UI/UX Designer to create user-centered design solutions.', ARRAY['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'], NOW() - INTERVAL '3 days', false, 'https://bajaj.com/careers/ui-ux-designer', 'indian_job_board'),

-- Kochi Jobs
('Full Stack Developer', 'Larsen & Toubro', 'Kochi, Kerala', 9.9312, 76.2673, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'L&T is looking for a Full Stack Developer to work on engineering and construction technology solutions.', ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'], NOW() - INTERVAL '5 days', false, 'https://larsentoubro.com/careers/full-stack-developer', 'indian_job_board'),

('DevOps Engineer', 'ITC Limited', 'Kochi, Kerala', 9.9312, 76.2673, 800000, 1200000, '₹8L - ₹12L', 'Full-time', 'ITC is seeking a DevOps Engineer to manage infrastructure and deployment pipelines.', ARRAY['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'], NOW() - INTERVAL '8 days', false, 'https://itcportal.com/careers/devops-engineer', 'indian_job_board'),

('Data Analyst', 'HDFC Bank', 'Kochi, Kerala', 9.9312, 76.2673, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'HDFC Bank is looking for a Data Analyst to work on banking analytics and insights.', ARRAY['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'], NOW() - INTERVAL '2 days', false, 'https://hdfcbank.com/careers/data-analyst', 'indian_job_board'),

-- Chandigarh Jobs
('Java Developer', 'ICICI Bank', 'Chandigarh, Chandigarh', 30.7333, 76.7794, 650000, 1000000, '₹6.5L - ₹10L', 'Full-time', 'ICICI Bank is seeking a Java Developer to build banking applications and financial solutions.', ARRAY['Java', 'Spring Boot', 'Hibernate', 'Oracle', 'Microservices'], NOW() - INTERVAL '7 days', false, 'https://icicibank.com/careers/java-developer', 'indian_job_board'),

('React Developer', 'State Bank of India', 'Chandigarh, Chandigarh', 30.7333, 76.7794, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'SBI is looking for a React Developer to create modern banking interfaces.', ARRAY['React', 'Redux', 'JavaScript', 'CSS', 'HTML'], NOW() - INTERVAL '4 days', false, 'https://sbi.co.in/careers/react-developer', 'indian_job_board'),

('Python Developer', 'Axis Bank', 'Chandigarh, Chandigarh', 30.7333, 76.7794, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Axis Bank is seeking a Python Developer to work on fintech solutions and APIs.', ARRAY['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis'], NOW() - INTERVAL '6 days', false, 'https://axisbank.com/careers/python-developer', 'indian_job_board'),

-- Indore Jobs
('Frontend Developer', 'Kotak Mahindra Bank', 'Indore, Madhya Pradesh', 22.7196, 75.8577, 550000, 850000, '₹5.5L - ₹8.5L', 'Full-time', 'Kotak Mahindra Bank is looking for a Frontend Developer to build banking web applications.', ARRAY['React', 'Vue.js', 'CSS', 'JavaScript', 'TypeScript'], NOW() - INTERVAL '9 days', false, 'https://kotak.com/careers/frontend-developer', 'indian_job_board'),

('Backend Developer', 'Yes Bank', 'Indore, Madhya Pradesh', 22.7196, 75.8577, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'Yes Bank is seeking a Backend Developer to build scalable banking systems.', ARRAY['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis'], NOW() - INTERVAL '3 days', false, 'https://yesbank.in/careers/backend-developer', 'indian_job_board'),

('DevOps Engineer', 'IndusInd Bank', 'Indore, Madhya Pradesh', 22.7196, 75.8577, 750000, 1150000, '₹7.5L - ₹11.5L', 'Full-time', 'IndusInd Bank is looking for a DevOps Engineer to manage cloud infrastructure.', ARRAY['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'], NOW() - INTERVAL '5 days', false, 'https://indusind.com/careers/devops-engineer', 'indian_job_board'),

-- Jaipur Jobs
('Full Stack Developer', 'Punjab National Bank', 'Jaipur, Rajasthan', 26.9124, 75.7873, 600000, 950000, '₹6L - ₹9.5L', 'Full-time', 'PNB is seeking a Full Stack Developer to work on digital banking solutions.', ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'], NOW() - INTERVAL '8 days', false, 'https://pnb.co.in/careers/full-stack-developer', 'indian_job_board'),

('Data Scientist', 'MakeMyTrip', 'Jaipur, Rajasthan', 26.9124, 75.7873, 800000, 1200000, '₹8L - ₹12L', 'Full-time', 'MakeMyTrip is looking for a Data Scientist to work on travel analytics and recommendations.', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'], NOW() - INTERVAL '2 days', false, 'https://makemytrip.com/careers/data-scientist', 'indian_job_board'),

('UI/UX Designer', 'OYO', 'Jaipur, Rajasthan', 26.9124, 75.7873, 550000, 850000, '₹5.5L - ₹8.5L', 'Full-time', 'OYO is seeking a UI/UX Designer to create hospitality and travel interfaces.', ARRAY['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'], NOW() - INTERVAL '7 days', false, 'https://oyo.com/careers/ui-ux-designer', 'indian_job_board'),

-- Lucknow Jobs
('React Developer', 'PolicyBazaar', 'Lucknow, Uttar Pradesh', 26.8467, 80.9462, 600000, 900000, '₹6L - ₹9L', 'Full-time', 'PolicyBazaar is looking for a React Developer to build insurance platform interfaces.', ARRAY['React', 'Redux', 'JavaScript', 'CSS', 'HTML'], NOW() - INTERVAL '4 days', false, 'https://policybazaar.com/careers/react-developer', 'indian_job_board'),

('Python Developer', 'PhonePe', 'Lucknow, Uttar Pradesh', 26.8467, 80.9462, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'PhonePe is seeking a Python Developer to work on payment solutions and fintech APIs.', ARRAY['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis'], NOW() - INTERVAL '6 days', false, 'https://phonepe.com/careers/python-developer', 'indian_job_board'),

('DevOps Engineer', 'Razorpay', 'Lucknow, Uttar Pradesh', 26.8467, 80.9462, 800000, 1200000, '₹8L - ₹12L', 'Full-time', 'Razorpay is looking for a DevOps Engineer to manage payment infrastructure.', ARRAY['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'], NOW() - INTERVAL '3 days', false, 'https://razorpay.com/careers/devops-engineer', 'indian_job_board'),

-- Remote Jobs
('Senior Full Stack Developer', 'Freshworks', 'Remote', NULL, NULL, 1000000, 1500000, '₹10L - ₹15L', 'Full-time', 'Freshworks is seeking a Senior Full Stack Developer to work remotely on customer engagement platforms.', ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'], NOW() - INTERVAL '1 day', true, 'https://freshworks.com/careers/senior-full-stack-developer', 'indian_job_board'),

('Frontend Developer', 'Zoho', 'Remote', NULL, NULL, 800000, 1200000, '₹8L - ₹12L', 'Full-time', 'Zoho is looking for a Frontend Developer to work remotely on productivity software.', ARRAY['React', 'Vue.js', 'CSS', 'JavaScript', 'TypeScript'], NOW() - INTERVAL '5 days', true, 'https://zoho.com/careers/frontend-developer', 'indian_job_board'),

('Backend Developer', 'BrowserStack', 'Remote', NULL, NULL, 900000, 1400000, '₹9L - ₹14L', 'Full-time', 'BrowserStack is seeking a Backend Developer to work remotely on testing infrastructure.', ARRAY['Python', 'Django', 'PostgreSQL', 'Redis', 'AWS'], NOW() - INTERVAL '2 days', true, 'https://browserstack.com/careers/backend-developer', 'indian_job_board'),

('DevOps Engineer', 'Postman', 'Remote', NULL, NULL, 1000000, 1600000, '₹10L - ₹16L', 'Full-time', 'Postman is looking for a DevOps Engineer to work remotely on API platform infrastructure.', ARRAY['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'], NOW() - INTERVAL '7 days', true, 'https://postman.com/careers/devops-engineer', 'indian_job_board'),

('Data Scientist', 'Chargebee', 'Remote', NULL, NULL, 1100000, 1700000, '₹11L - ₹17L', 'Full-time', 'Chargebee is seeking a Data Scientist to work remotely on subscription analytics.', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'], NOW() - INTERVAL '4 days', true, 'https://chargebee.com/careers/data-scientist', 'indian_job_board'),

-- Additional jobs to reach 50+
('Software Engineer', 'Tata Consultancy Services', 'Mumbai, Maharashtra', 19.0760, 72.8777, 500000, 750000, '₹5L - ₹7.5L', 'Internship', 'TCS is offering internship opportunities for fresh graduates to work on real-world projects.', ARRAY['Java', 'Spring Boot', 'MySQL', 'Git', 'Agile'], NOW() - INTERVAL '10 days', false, 'https://tcs.com/careers/software-engineer-intern', 'indian_job_board'),

('React Developer', 'Infosys', 'Bangalore, Karnataka', 12.9716, 77.5946, 550000, 850000, '₹5.5L - ₹8.5L', 'Contract', 'Infosys is looking for a React Developer on contract basis for a 6-month project.', ARRAY['React', 'Redux', 'JavaScript', 'CSS', 'HTML'], NOW() - INTERVAL '12 days', false, 'https://infosys.com/careers/react-developer-contract', 'indian_job_board'),

('Python Developer', 'Wipro', 'Hyderabad, Telangana', 17.3850, 78.4867, 600000, 900000, '₹6L - ₹9L', 'Part-time', 'Wipro is seeking a Python Developer for part-time work on data processing projects.', ARRAY['Python', 'Pandas', 'NumPy', 'SQL', 'Jupyter'], NOW() - INTERVAL '15 days', false, 'https://wipro.com/careers/python-developer-parttime', 'indian_job_board'),

('UI Designer', 'HCL Technologies', 'Chennai, Tamil Nadu', 13.0827, 80.2707, 500000, 800000, '₹5L - ₹8L', 'Freelance', 'HCL is looking for a UI Designer for freelance work on client projects.', ARRAY['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'], NOW() - INTERVAL '18 days', false, 'https://hcl.com/careers/ui-designer-freelance', 'indian_job_board'),

('DevOps Engineer', 'Tech Mahindra', 'Pune, Maharashtra', 18.5204, 73.8567, 700000, 1100000, '₹7L - ₹11L', 'Full-time', 'Tech Mahindra is seeking a DevOps Engineer to manage cloud infrastructure and CI/CD pipelines.', ARRAY['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'], NOW() - INTERVAL '20 days', false, 'https://techmahindra.com/careers/devops-engineer', 'indian_job_board'),

('Data Analyst', 'Accenture India', 'Kolkata, West Bengal', 22.5726, 88.3639, 550000, 850000, '₹5.5L - ₹8.5L', 'Full-time', 'Accenture is looking for a Data Analyst to work on business intelligence projects.', ARRAY['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'], NOW() - INTERVAL '22 days', false, 'https://accenture.com/careers/data-analyst', 'indian_job_board'),

('Full Stack Developer', 'Capgemini', 'Ahmedabad, Gujarat', 23.0225, 72.5714, 650000, 1000000, '₹6.5L - ₹10L', 'Full-time', 'Capgemini is seeking a Full Stack Developer to work on digital transformation projects.', ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'], NOW() - INTERVAL '25 days', false, 'https://capgemini.com/careers/full-stack-developer', 'indian_job_board'),

('Machine Learning Engineer', 'Cognizant', 'Gurgaon, Haryana', 28.4595, 77.0266, 900000, 1400000, '₹9L - ₹14L', 'Full-time', 'Cognizant is looking for a Machine Learning Engineer to work on AI/ML solutions.', ARRAY['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'], NOW() - INTERVAL '28 days', false, 'https://cognizant.com/careers/ml-engineer', 'indian_job_board'),

('Product Manager', 'IBM India', 'Noida, Uttar Pradesh', 28.5355, 77.3910, 1000000, 1500000, '₹10L - ₹15L', 'Full-time', 'IBM is seeking a Product Manager to lead product strategy and development.', ARRAY['Product Management', 'Strategy', 'Analytics', 'Agile', 'Leadership'], NOW() - INTERVAL '30 days', false, 'https://ibm.com/careers/product-manager', 'indian_job_board');

