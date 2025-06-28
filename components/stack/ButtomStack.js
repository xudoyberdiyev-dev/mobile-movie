import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../pages/Home";
import Search from "../../pages/Serach";
import MyList from "../../pages/MyList";
import Notification from "../../pages/Notification";
import { ProfileStack } from "./ProfileStack";

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Search") iconName = "search";
        else if (route.name === "My List") iconName = "list";
        else if (route.name === "Notification") iconName = "bell";
        else if (route.name === "Profile") iconName = "user";
  
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "white",
      tabBarStyle: {
        backgroundColor: "black",
        height: 60,
        position: "absolute", // ✅ Shunday qiling
        bottom: 0, // ✅ Pastga yopishtirish
      },
      tabBarLabelStyle: { fontSize: 12 },
      headerShown: false,
      keyboardHidesTabBar: false, // ✅ Klaviatura ochilganda yashirinmasligi uchun
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="My List" component={MyList} />
    <Tab.Screen name="Notification" component={Notification} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
  
  );
};

export default BottomStack;
