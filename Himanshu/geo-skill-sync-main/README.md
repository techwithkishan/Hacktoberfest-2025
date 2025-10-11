# GeoSkillSync - AI-Powered Career Platform

A modern web application that combines geolocation-aware job searching with AI-powered project analysis to help users find relevant career opportunities.

## Features

### 🌍 Geo-Aware Opportunity Mapper
- **Location Detection**: Automatic GPS and IP-based location detection
- **Smart Job Prioritization**: Local jobs first, then remote options
- **Advanced Filtering**: Job type, salary range, skills, and remote work options
- **Real-time Search**: Fast job search with instant results

### 🚀 Project-to-Job Real-Time Matcher
- **AI Analysis**: Gemini API-powered project analysis
- **GitHub Integration**: Automatic repository analysis
- **Skill Extraction**: Identifies technologies, frameworks, and complexity
- **Career Matching**: Matches projects to relevant job opportunities
- **Match Scoring**: AI-powered compatibility scoring

### 👤 User Profile System
- **Personal Information**: Name, email, location, experience
- **Skills Management**: Add, remove, and organize skills
- **Job Preferences**: Salary range, job types, preferred locations
- **Application Tracking**: Save jobs and track application status

### 💾 Job Management
- **Save Jobs**: Heart jobs for later review
- **Status Tracking**: Track application progress (saved, applied, interview, offer, rejected)
- **Notes System**: Add personal notes to job opportunities
- **Search & Filter**: Find saved jobs quickly

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS
- **State Management**: React Query, Local Storage
- **AI Integration**: Google Gemini API
- **Database**: Supabase (PostgreSQL)
- **APIs**: GitHub API, Job APIs (LinkedIn, NCS, Internshala)
- **Geolocation**: GPS + IP-based fallback

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key
- Supabase account (optional for enhanced features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd geo-skill-sync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Required: Gemini API Key for AI features
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Optional: Supabase Configuration (already configured)
   # VITE_SUPABASE_URL=your_supabase_url
   # VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Optional: External Job API Keys (for future integrations)
   # VITE_LINKEDIN_API_KEY=your_linkedin_api_key
   # VITE_NCS_API_KEY=your_ncs_api_key
   # VITE_INTERNSHALA_API_KEY=your_internshala_api_key
   ```

4. **Get API Keys**
   - **Gemini API**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to get your free API key
   - **Supabase**: The app comes with a pre-configured Supabase instance, but you can set up your own

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

### Job Search
1. **Auto-location**: The app automatically detects your location
2. **Search**: Enter job titles, keywords, or company names
3. **Filter**: Use advanced filters for job type, salary, skills
4. **Save**: Heart jobs you're interested in
5. **Apply**: Click "Apply" to visit the job posting

### Project Analysis
1. **Describe Project**: Enter your project description or GitHub URL
2. **AI Analysis**: Gemini analyzes your tech stack and skills
3. **View Matches**: See matching job opportunities
4. **Apply**: Direct links to apply for relevant positions

### Profile Management
1. **Edit Profile**: Click "Edit Profile" to update information
2. **Add Skills**: Manage your technical skills
3. **Set Preferences**: Configure job type and salary preferences
4. **Save**: Your profile is automatically saved

### Saved Jobs
1. **View Saved**: Navigate to "Saved Jobs" to see all saved opportunities
2. **Track Status**: Update application status (saved, applied, interview, etc.)
3. **Add Notes**: Add personal notes to each job
4. **Search**: Find specific saved jobs quickly

## API Integration

### Current Integrations
- **Google Gemini API**: AI-powered project analysis and job matching
- **GitHub API**: Repository analysis and README extraction
- **IP Geolocation**: Fallback location detection
- **Supabase**: Job data storage and user profiles

### Future Integrations
- **LinkedIn Jobs API**: Real LinkedIn job postings
- **NCS API**: National Career Service integration
- **Internshala API**: Internship opportunities
- **Additional Job Boards**: Indeed, Glassdoor, etc.

## Database Schema

The app uses a Supabase PostgreSQL database with the following main table:

```sql
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  distance_miles DECIMAL(5, 2),
  salary_min INTEGER,
  salary_max INTEGER,
  salary_display TEXT,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT,
  skills TEXT[],
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_remote BOOLEAN DEFAULT false,
  external_url TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@geoskillsync.com or create an issue in the repository.

## Roadmap

- [ ] Real-time job API integrations
- [ ] Advanced AI matching algorithms
- [ ] Mobile app development
- [ ] Company profiles and reviews
- [ ] Interview preparation tools
- [ ] Salary negotiation guidance
- [ ] Career path recommendations