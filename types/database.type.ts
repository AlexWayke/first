import { Models } from "appwrite";

export interface Habit extends Models.DefaultDocument {
  user_id: string;
  title: string;
  description: string;
  frequency: string;
  streak_count: number;
  last_completed: string;
  $created_at: string;
}