import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Profile = ({navigation}) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user"); // Userni o‘chiramiz

    const testUser = await AsyncStorage.getItem("user");
    console.log("🔴 Logoutdan keyin user:", testUser); // O‘chirilganligini tekshiramiz

    navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
    });
};
  return (
    <View className="flex-1 bg-cyan-500 justify-center items-center ">
      <TouchableOpacity onPress={handleLogout} className="p-4 bg-black rounded">
       <Text className='text-white text-center'>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile