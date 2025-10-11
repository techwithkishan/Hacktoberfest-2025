# Quick Setup Guide

## 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## 2. Create Environment File

Create a `.env` file in the root directory with:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

## 3. Install and Run

```bash
npm install
npm run dev
```

## 4. Test the Features

### Job Search
- The app will automatically detect your location
- Search for jobs using keywords
- Use filters to narrow down results
- Save jobs by clicking the heart icon

### Project Analysis
- Go to "Project Matcher" tab
- Enter a project description or GitHub URL
- Watch the AI analyze your project
- See matching job opportunities

### User Profile
- Click "Profile" to set up your preferences
- Add your skills and experience
- Set job preferences and salary range

## 5. Database Setup (Optional)

The app comes with a pre-configured Supabase database. If you want to use your own:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from the README
3. Update the Supabase credentials in `src/integrations/supabase/client.ts`

## Troubleshooting

### "Failed to analyze project" error
- Make sure your Gemini API key is correct
- Check that the API key has proper permissions
- Verify the key is in your `.env` file

### Location detection not working
- Allow location permissions in your browser
- The app will fallback to IP-based location if GPS fails

### Jobs not loading
- Check your internet connection
- The app uses mock data - real job APIs need additional setup

## Need Help?

- Check the README.md for detailed documentation
- Create an issue in the repository
- Email support@geoskillsync.com

