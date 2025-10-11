// Environment configuration
export const config = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://ociivtzldmbnnlbjmzvc.supabase.co',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jaWl2dHpsZG1ibm5sYmptenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODc0MDgsImV4cCI6MjA3Mzk2MzQwOH0.S6B23P_Oyo_ak2Ujm_oTmz0M5zJSaVgbNnHlClT5llg',
  
  // External API keys (for future integrations)
  linkedinApiKey: import.meta.env.VITE_LINKEDIN_API_KEY || '',
  ncsApiKey: import.meta.env.VITE_NCS_API_KEY || '',
  internshalaApiKey: import.meta.env.VITE_INTERNSHALA_API_KEY || '',
  
  // Feature flags
  enableGeminiAnalysis: !!import.meta.env.VITE_GEMINI_API_KEY,
  enableGitHubIntegration: true,
  enableJobApiIntegration: true,
};

// Validate required environment variables
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!config.geminiApiKey) {
    errors.push('VITE_GEMINI_API_KEY is required for AI-powered project analysis');
  }
  
  if (errors.length > 0) {
    console.warn('Configuration warnings:', errors);
  }
  
  return errors.length === 0;
};

