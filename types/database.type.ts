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

export interface HabitCompletion extends Models.DefaultDocument {
  habit_id: string;
  user_id: string;
  completed_at: string;
}