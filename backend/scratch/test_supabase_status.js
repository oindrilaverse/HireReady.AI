import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing connection to Supabase:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

const start = Date.now();
try {
  const { data, error } = await supabase.from('users').select('id').limit(1);
  const duration = Date.now() - start;
  console.log(`Query completed in ${duration}ms`);
  if (error) {
    console.error('Supabase Query Error:', error);
  } else {
    console.log('Supabase Query Success. Data:', data);
  }
} catch (err) {
  console.error('Connection failed:', err);
}
