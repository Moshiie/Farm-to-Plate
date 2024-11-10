// supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // Required for React Native compatibility

// Replace with your actual Supabase URL and public anon key
const SUPABASE_URL = 'https://tegzicopvmcskrsjutln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZ3ppY29wdm1jc2tyc2p1dGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMjM4MzUsImV4cCI6MjA0Njc5OTgzNX0.w40mx3v7u7UEWZxNAWKbFEy8O_3gAMezfUmUsGqwKKQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
