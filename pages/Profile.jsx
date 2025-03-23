import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getUser } from '../connection/service/AuthService';

const Profile = ({navigation,route}) => {
  const {userId,token}=route.params
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);



  const handleLogout = async () => {
    await AsyncStorage.removeItem("user"); // Userni o‘chiramiz

    const testUser = await AsyncStorage.getItem("user");
    console.log("🔴 Logoutdan keyin user:", testUser); // O‘chirilganligini tekshiramiz

    navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
    });
};
useEffect(() => {
  getUser(userId, token, setUserData, setLoading);
}, [userId, token]);

if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

  return (
    <View className="flex-1 bg-cyan-500 justify-center items-center ">
      {userData?(
         <TouchableOpacity onPress={handleLogout} className="p-4 bg-black rounded">
         <Text className='text-white text-center'>Log out</Text>
         <Text>{userData.name}</Text>
         <Text>{userData.surname}</Text>
        </TouchableOpacity>
      ):(
        <Text>Xatolik oka</Text>
      )}
     
    </View>
  )
}

export default Profile