import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";

export const BUCKET_NAME = "enka-hospital";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
