import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "../../utils/AuthStack";
import Profile from "../../pages/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";


const Stack = createStackNavigator();

export const ProfileStack =()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Foydalanuvchi login qilganini tekshiramiz (storage yoki API orqali)
        const checkUser = async () => {
          const user = await AsyncStorage.getItem("user");
          setIsAuthenticated(user !== null); // Agar user bo‘lsa, Profile chiqadi, aks holda Login
        };
        checkUser();
      }, []);

      return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Profile" component={Profile} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
      )
}