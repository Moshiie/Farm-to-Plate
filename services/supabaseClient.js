// supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // Required for React Native compatibility

// Replace with your actual Supabase URL and public anon key
const SUPABASE_URL = 'JC ikaw na bahala ani';
const SUPABASE_KEY = 'apil sad ni';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
