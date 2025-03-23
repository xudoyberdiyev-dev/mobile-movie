import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "../../utils/AuthStack";
import Profile from "../../pages/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const Stack = createStackNavigator();

export const ProfileStack = ({navigation}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const isFocused = useIsFocused(); // Sahifa har safar ochilganda ishlaydi

    const checkUser = async () => {
      try {
          const user = await AsyncStorage.getItem("user");
          console.log("🔍 ProfileStack: AsyncStorage dan user:", user); // Log qo‘shamiz
  
          setIsAuthenticated(user !== null); 
      } catch (error) {
          console.log("🔴 Error reading AsyncStorage:", error);
          setIsAuthenticated(false);
      }
  };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            checkUser(); // Sahifa har safar ochilganda userni tekshiramiz
        });
        return unsubscribe;
    }, [navigation]);

    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Person" component={Profile} />
            ) : (
                <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};
