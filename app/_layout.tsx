import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RouteProtecter ({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();
  
  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if(!user && !inAuthGroup && !isLoadingUser) {
      router.replace('/auth');
    } else if(user && inAuthGroup && !isLoadingUser) {
      router.replace('/');
    }
  }, [user, segments, router, isLoadingUser])

  return (
    <Stack>{children}</Stack>
  )
}

export default function RootLayout() {
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <RouteProtecter>
              <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            </RouteProtecter>
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
