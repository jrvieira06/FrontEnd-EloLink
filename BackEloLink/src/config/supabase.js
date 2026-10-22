import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ ERRO: SUPABASE_URL ou SUPABASE_ANON_KEY não foram encontradas no arquivo .env!');
  console.error('👉 Verifique se o arquivo .env está na raiz do projeto (fora da pasta src).\n');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder'
);