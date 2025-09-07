import { KeyboardAvoidingView, Platform, View, Text, TextInput } from "react-native"

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "windows" ? "padding" : "height"}>
      <View>
        <Text>Create account</Text>
        <TextInput aria-label="Email" autoCapitalize="none" keyboardType="email-address" placeholder="example@email.com" />
      </View>
    </KeyboardAvoidingView>
  )
}