import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import * as eva from '@eva-design/eva';
import * as SecureStore from "expo-secure-store";
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme";
import { User } from './types/user';
import { AuthContext } from './context';

export default function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) setUser(JSON.parse(user))
    }
    getUser();
  }, [])
danh
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider {...eva} theme={theme}>
          <Navigation />
        </ApplicationProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}


