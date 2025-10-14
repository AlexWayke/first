import { Models } from "appwrite";

export interface Habit extends Models.DefaultRow {
  user_id: string;
  title: string;
  description: string;
  frequency: string;
  streak_count: number;
  last_completed: string;
  best_streak: number;
  $created_at: string;
}