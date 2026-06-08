import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Fetching latest resume from live Supabase database...');
  const { data: resumes, error } = await supabase
    .from('resumes')
    .select('id, text')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching resume from Supabase:', error);
    return;
  }

  if (!resumes || resumes.length === 0) {
    console.log('No resumes found in the live Supabase database.');
    return;
  }

  const latestResume = resumes[0];
  console.log(`Found live resume ID: ${latestResume.id}`);
  console.log(`Resume Text Length: ${latestResume.text?.length || 0} characters`);

  const prodUrl = `https://hireready-ai-v2.onrender.com/api/jobs/suggested/${latestResume.id}`;
  console.log(`\nQuerying production API: ${prodUrl}`);

  try {
    const res = await fetch(prodUrl);
    console.log(`Response Status: ${res.status}`);
    
    const text = await res.text();
    console.log('Raw response preview (150 chars):', text.substring(0, 150));

    const envelope = JSON.parse(text);
    if (envelope.success && Array.isArray(envelope.data)) {
      console.log(`\n✅ PRODUCTION VERIFIED!`);
      console.log(`Successfully retrieved ${envelope.data.length} suggestions.`);
      envelope.data.forEach((job, idx) => {
        console.log(`- Job #${idx+1}: ${job.title} at ${job.company} (${job.matchScore}% Match)`);
      });
    } else {
      console.log(`\n❌ production check failed: Envelope success or data incorrect.`, envelope);
    }
  } catch (err) {
    console.error('Error fetching from production API:', err.message);
  }
}

test();
