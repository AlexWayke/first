import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react"
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native"
import { Text, TextInput, Button, useTheme } from "react-native-paper"

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>("");

  const theme = useTheme();
  const router = useRouter()

  const {signUp, signIn} = useAuth();
  
  const handleSwitchMode = () => {
    setIsSignUp((curr) => !curr);
  }

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must me at least 6 characters long");
      return;
    }

    setError(null);

    if(isSignUp){
      const error = await signUp(email, password);
      if(error){
        setError(error);
      }
    } else {
      await signIn(email, password);

      router.replace('/');
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "windows" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create account" : "Welcome back"}
        </Text>

        <TextInput 
          label="Email" 
          autoCapitalize="none" 
          keyboardType="email-address" 
          placeholder="example@email.com" 
          mode="outlined" 
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput 
          label="Password" 
          autoCapitalize="none"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        {error && (
          <Text style={{ color: theme.colors.error }}>{error}</Text>
        )}

        <Button 
          mode="contained"
          onPress={handleAuth}
          style={styles.button}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Button 
          mode="text" 
          onPress={handleSwitchMode}
          style={styles.switchModeButton}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
})