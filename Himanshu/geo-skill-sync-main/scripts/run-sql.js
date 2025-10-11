import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = "https://ociivtzldmbnnlbjmzvc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jaWl2dHpsZG1ibm5sYmptenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODc0MDgsImV4cCI6MjA3Mzk2MzQwOH0.S6B23P_Oyo_ak2Ujm_oTmz0M5zJSaVgbNnHlClT5llg";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runSQL() {
  try {
    // Read the SQL file
    const sqlContent = fs.readFileSync('scripts/indian-jobs.sql', 'utf8');
    
    // Split by semicolon and filter out empty statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}...`);
        
        const { data, error } = await supabase.rpc('exec_sql', { 
          sql_query: statement 
        });
        
        if (error) {
          console.error(`Error in statement ${i + 1}:`, error);
          // Continue with next statement
        } else {
          console.log(`Statement ${i + 1} executed successfully`);
        }
      }
    }
    
    console.log("All SQL statements executed!");
    
  } catch (error) {
    console.error("Error running SQL:", error);
  }
}

runSQL();

