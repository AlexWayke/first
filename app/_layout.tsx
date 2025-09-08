import { AuthProvider } from "@/lib/auth-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isAuth = false;
console.log('check')
  return (
    <Stack>
      <AuthProvider>
        <Stack.Protected guard={isAuth}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isAuth}>
          <Stack.Screen name="auth" />
        </Stack.Protected>
      </AuthProvider>
    </Stack>
  );
}
