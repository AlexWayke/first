import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Query } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>();

  const fetchHabits = useCallback(async () => {
    try{
      const response = await databases.listDocuments(
        DATABASE_ID!, 
        HABITS_COLLECTION_ID!,
        [Query.equal("user_id", user?.$id ?? "")]
      );

      console.log(response)
      setHabits(response.documents as Habit[]);
    } catch (error) {
      console.error(error)
    }
  }, [user?.$id])

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits, user])

  return (
    <View style={styles.view}>
      <View>
        <Text variant="headlineSmall">Today`s habits</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>
      </View>

      {habits?.length === 0 ? (
        <View>
          <Text>No habits yet. Add your first habit.</Text>
        </View>
      ) : (
        habits?.map((habit, key) => (
          <View key={key}>
            <Text>{habit.title}</Text>
            <Text>{habit.description}</Text>
            <View>
              <View>
                <MaterialCommunityIcons name="fire" size={18} color={"#ff9800"} />
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})