# Supabase Setup Instructions

## Add 50+ Indian Jobs to Your Database

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: `ociivtzldmbnnlbjmzvc`

### Step 2: Open SQL Editor
1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New Query" to create a new SQL query

### Step 3: Copy and Paste the SQL
Copy the entire SQL code from the terminal output above (the content between the `===` lines) and paste it into the SQL editor.

### Step 4: Execute the Query
1. Click the "Run" button (or press Ctrl+Enter)
2. Wait for the query to complete
3. You should see a success message indicating that 50+ jobs were inserted

### Step 5: Verify the Data
1. Go to "Table Editor" in the left sidebar
2. Select the "jobs" table
3. You should see all the Indian jobs with proper location data

## What This Adds

The SQL script adds 50+ jobs from major Indian cities including:

### Cities Covered:
- **Mumbai, Maharashtra** (5 jobs)
- **Delhi, Delhi** (5 jobs) 
- **Bangalore, Karnataka** (5 jobs)
- **Hyderabad, Telangana** (5 jobs)
- **Chennai, Tamil Nadu** (5 jobs)
- **Pune, Maharashtra** (5 jobs)
- **Kolkata, West Bengal** (5 jobs)
- **Ahmedabad, Gujarat** (5 jobs)
- **Gurgaon, Haryana** (3 jobs)
- **Noida, Uttar Pradesh** (3 jobs)
- **Kochi, Kerala** (3 jobs)
- **Chandigarh, Chandigarh** (3 jobs)
- **Indore, Madhya Pradesh** (3 jobs)
- **Jaipur, Rajasthan** (3 jobs)
- **Lucknow, Uttar Pradesh** (3 jobs)
- **Remote Jobs** (5 jobs)

### Companies Included:
- TCS, Infosys, Wipro, HCL, Tech Mahindra
- Accenture, Capgemini, Cognizant, IBM, Microsoft
- Google, Amazon, Flipkart, Paytm, Zomato
- Swiggy, Ola, Uber, Byju's, Unacademy
- Reliance Jio, Airtel, Vodafone Idea
- Major banks: HDFC, ICICI, SBI, Axis, Kotak
- And many more...

### Job Types:
- Full-time, Part-time, Contract, Internship, Freelance
- Software Engineers, Developers, Data Scientists
- DevOps Engineers, Product Managers, Designers
- Remote and on-site positions

### Features:
- **Location Data**: Each job has precise latitude/longitude coordinates
- **Salary Ranges**: Realistic Indian salary ranges in INR
- **Skills Arrays**: Relevant technical skills for each role
- **Recent Postings**: Jobs posted within the last 30 days
- **Remote Options**: Mix of remote and location-based jobs

## Testing Location-Based Filtering

After adding the jobs, test the location features:

1. **Auto-Detection**: The app will automatically detect your location
2. **Distance Calculation**: Jobs will be sorted by distance from your location
3. **Local First**: Local jobs appear before remote jobs
4. **Search by City**: You can search for specific Indian cities
5. **Filter by Location**: Use the location filter to find jobs in specific areas

## Troubleshooting

If you encounter any issues:

1. **RLS Policy Error**: Make sure you're using the service role key or disable RLS temporarily
2. **Permission Denied**: Check that your Supabase project has the correct permissions
3. **Data Not Showing**: Refresh the app and check the browser console for errors

The location-based job filtering will now work perfectly with real Indian job data!

