export type Lead = {
  id: string;
  name: string;
  company: string;
  website?: string;
  role?: string;
  industry?: string;
  painPoints?: string;
  notes?: string;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  content: string; // The markdown content
  description?: string;
  created_at: string;
};

export type MessageGeneration = {
  id: string;
  lead_id: string;
  skill_id?: string;
  email_a: string;
  email_b: string;
  dm_a: string;
  dm_b: string;
  subject_a: string;
  subject_b: string;
  follow_up_email: string;
  follow_up_dm: string;
  is_saved: boolean;
  is_favorite: boolean;
  is_rejected: boolean;
  created_at: string;
};

export type ProviderConfig = {
  id: string;
  name: string; // OpenAI, Anthropic, Gemini, Groq, Custom
  api_key: string; // Will store encrypted or local only
  base_url?: string;
  model_name?: string;
  is_default: boolean;
};

export type UserSettings = {
  id: string;
  profile_name: string;
  company: string;
  website: string;
  signature: string;
  theme: 'light' | 'dark' | 'system';
  default_provider_id?: string;
  default_skill_id?: string;
};
