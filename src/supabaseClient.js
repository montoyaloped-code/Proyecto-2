import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yvxhmgczvdfunpaintpd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2eGhtZ2N6dmRmdW5wYWludHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NzI1MTQsImV4cCI6MjA5NjU0ODUxNH0.Dbn1uHVGv4Oz6yysxnQ-6klWrLJRZGrMasT7kP9I53Q'; // ← pega tu key completa

export const supabase = createClient(supabaseUrl, supabaseAnonKey);