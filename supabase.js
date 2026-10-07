// ============================================
// SAINT LEO'S MART
// SUPABASE CONNECTION TEST
// ============================================

const SUPABASE_URL = "https://tzjckojpgamjwigxmdja.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_gC9-plPxXV0qd7aeAUZWmA_qSGWETX4";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

console.log("Saint Leo's Mart → Supabase connected.");