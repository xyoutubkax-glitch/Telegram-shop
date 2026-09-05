const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://tipqcjweblagmpaipdlv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcHFjandlYmxhZ21wYWlwZGx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ5ODk4NCwiZXhwIjoyMDk4MDc0OTg0fQ.ae3uV4puvnr8dKcRe9LdW3FNZ1yQwP62ZRAZtmgP_b4"
);

module.exports = supabase;