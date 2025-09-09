import { AuthProvider } from "@/lib/auth-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isAuth = false;
  
  return (
    <AuthProvider>
      <Stack>
        <Stack.Protected guard={isAuth}>
          <Stack.Screen name="(tabs)"/>
        </Stack.Protected>

        <Stack.Protected guard={!isAuth}>
          <Stack.Screen name="auth" />
        </Stack.Protected>
      </Stack>
    </AuthProvider>
  );
}
