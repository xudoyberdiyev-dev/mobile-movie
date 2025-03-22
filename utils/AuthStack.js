import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from 'react'
import ForgotPassword from "../pages/authPages/ForgotPassword";
import { Login } from "../pages/authPages/Login";
import { Register } from "../pages/authPages/Register";


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name='Forgot' component={ForgotPassword}/>
    </Stack.Navigator>
  )
}

export default AuthStack