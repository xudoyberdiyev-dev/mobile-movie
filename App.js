import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import ButtomStack from './components/stack/ButtomStack';
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    
    <NavigationContainer>
    <ButtomStack />
    <Toast/>
  </NavigationContainer>
     
  );
}


