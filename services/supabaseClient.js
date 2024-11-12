// supabaseClient.js
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto';    
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://viungyzfbihbagfrusid.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpdW5neXpmYmloYmFnZnJ1c2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MjAxMjYsImV4cCI6MjA0Njk5NjEyNn0.FK5V9hu9LUJfVkYLmn5Rd60IHsl6VXDtuYHAj7zT9So'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { 
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
})