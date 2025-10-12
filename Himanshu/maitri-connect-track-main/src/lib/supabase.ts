import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

// Initialize supabase if env vars exist
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export const getSupabase = () => supabase;

// Auth helpers
export const auth = {
  async signUp(email: string, password: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const res = await supabase.auth.signUp({ email, password });
    if (res.error) throw res.error;
    return res.data;
  },

  async signIn(email: string, password: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) throw res.error;
    return res.data;
  },

  async signOut() {
    if (!supabase) throw new Error('Supabase not configured');
    const res = await supabase.auth.signOut();
    if (res.error) throw res.error;
    return res;
  },

  getUser() {
    if (!supabase) return null;
    return supabase.auth.getUser();
  }
};

// Helper wrappers that fallback to localStorage when supabase is not configured
export const db = {
  async getWorkers() {
    if (!supabase) return JSON.parse(localStorage.getItem('maitri-workers') || '{}');
    const { data, error } = await supabase.from('workers').select('*');
    if (error) throw error;
    const map: any = {};
    (data || []).forEach((w: any) => { map[w.maitriId] = w; });
    return map;
  },

  async upsertWorker(worker: any) {
    if (!supabase) {
      const workers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
      workers[worker.maitriId] = worker;
      localStorage.setItem('maitri-workers', JSON.stringify(workers));
      return worker;
    }
    const { data, error } = await supabase.from('workers').upsert(worker).select();
    if (error) throw error;
    return data?.[0];
  },

  async getJobs() {
    if (!supabase) return JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) throw error;
    const map: any = {};
    (data || []).forEach((j: any) => { map[j.id] = j; });
    return map;
  },

  async createJob(job: any) {
    if (!supabase) {
      const jobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
      jobs[job.id] = job;
      localStorage.setItem('maitri-jobs', JSON.stringify(jobs));
      return job;
    }
    const { data, error } = await supabase.from('jobs').insert(job).select();
    if (error) throw error;
    return data?.[0];
  },

  async applyToJob(jobId: string, applicant: any) {
    if (!supabase) {
      const jobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
      jobs[jobId] = jobs[jobId] || { applicants: {} };
      jobs[jobId].applicants = jobs[jobId].applicants || {};
      jobs[jobId].applicants[applicant.id] = applicant;
      localStorage.setItem('maitri-jobs', JSON.stringify(jobs));
      return applicant;
    }
    // For the DB, we assume a table job_applicants exists
    const { data, error } = await supabase.from('job_applicants').insert({ job_id: jobId, ...applicant }).select();
    if (error) throw error;
    return data?.[0];
  },

  async getApplicants(jobId: string) {
    if (!supabase) {
      const jobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
      return jobs[jobId]?.applicants || {};
    }
    const { data, error } = await supabase.from('job_applicants').select('*').eq('job_id', jobId);
    if (error) throw error;
    return data || [];
  }
,

  async updateApplicant(jobId: string, applicantId: string, updates: any) {
    if (!supabase) {
      const jobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
      if (jobs[jobId] && jobs[jobId].applicants && jobs[jobId].applicants[applicantId]) {
        jobs[jobId].applicants[applicantId] = { ...jobs[jobId].applicants[applicantId], ...updates };
        localStorage.setItem('maitri-jobs', JSON.stringify(jobs));
        return jobs[jobId].applicants[applicantId];
      }
      return null;
    }

    // Attempt to update in normalized table
    const { data, error } = await supabase.from('job_applicants').update(updates).eq('id', applicantId).select();
    if (error) throw error;
    return data?.[0];
  }
};
