import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { Query } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";

export default function StreaksScreen(){
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  
    const fetchHabits = useCallback(async () => {
      try{
        const response = await databases.listRows({
          databaseId: DATABASE_ID!, 
          tableId: HABITS_COLLECTION_ID!,
          queries: [Query.equal("user_id", user?.$id ?? "")]
        });
  
        setHabits(response.rows as Habit[]);
      } catch (error) {
        console.error(error)
      }
    }, [user?.$id]);

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
    
  }, [fetchHabits,user]);

  const rankedHabits = habits.sort((a, b) => b.streak_count = a.streak_count);
  const badgeStyles = [styles.badge1, styles.badge2, styles.badge3];

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineSmall">Habit Streaks</Text>

      {rankedHabits.length > 0 && (
        <View style={styles.rankingContainer}>
          <Text style={styles.rankingTitle}>🎖️ Top Streaks</Text>
          {rankedHabits.slice(0, 3).map((item, index) => (
            <View key={item.$id} style={styles.rankingRow}>
              <View style={[styles.rankingBadge, badgeStyles[index]]}>
                <Text style={styles.rankingBadgeText}>{index + 1}</Text>
              </View>
              <Text style={styles.rankingHabit}>{item.title}</Text>
              <Text style={styles.rankingStreak}>{item.best_streak}</Text>
            </View>
          ))}
        </View>
      )}

      {habits.length === 0 ? (
          <View>
            <Text>No habits yet. Add your first habit.</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {rankedHabits.map((habit, index) => (
              <Card key={habit.$id} style={[styles.card, index === 0 && styles.firstCard]}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.habitTitle}>{habit.title}</Text>
                  <Text style={styles.habitDescription}>{habit.description}</Text>
                  <View style={styles.statRow}>
                    <View style={styles.statBadge}>
                      <Text style={styles.statBadgeText}>🔥 {habit.streak_count}</Text>
                      <Text style={styles.statLabel}>Current</Text>
                    </View>
                    <View style={styles.statBadgeGold}>
                      <Text style={styles.statBadgeText}>🏆 {habit.best_streak}</Text>
                      <Text style={styles.statLabel}>Best</Text>
                    </View>
                    <View style={styles.statBadgeGreen}>
                      <Text style={styles.statBadgeText}>✅ {habit.best_streak}</Text>
                      <Text style={styles.statLabel}>Total</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  firstCard: {
    borderWidth: 2,
    borderColor: "#7c4dff"
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  habitDescription: {
    color: "#6c6c80",
    marginBottom: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statBadge: {
    backgroundColor: "#fff4e0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    minWidth: 60,
  },
  statBadgeGold: {
    backgroundColor: "#fffde7",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    minWidth: 60,
  },
  statBadgeGreen: {
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    minWidth: 60,
  },
  statBadgeText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#22223b",
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
    fontWeight: 500,
  },
  rankingContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  rankingTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    color: "#7c4dff",
    letterSpacing: 0.5,
  },
  rankingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 8,
  },
  rankingBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  badge1: {
    backgroundColor: "#ffd700"
  },
  badge2: {
    backgroundColor: "#c0c0c0"
  },
  badge3: {
    backgroundColor: "#cd7f32"
  },
  rankingBadgeText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
  rankingHabit: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },
  rankingStreak: {
    fontSize: 14,
    color: "#7c4dff",
    fontWeight: "bold"
  },
})