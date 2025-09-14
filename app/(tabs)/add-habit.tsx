import { View, StyleSheet } from "react-native";
import { TextInput, SegmentedButtons, Button } from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];

export default function AddHabitScreen(){
  return (
    <View style={styles.container}>
      <TextInput label="Title" mode="outlined" style={styles.input} />
      <TextInput label="Description" mode="outlined" style={styles.input} />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons 
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
          style={styles.segmentedButtons}
        />
      </View>
      <Button mode="contained" style={styles.button}>
        Add habit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  button: {}
})