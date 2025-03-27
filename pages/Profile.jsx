import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../connection/service/AuthService";

const Profile = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user"); // 🔥 Foydalanuvchini o‘chiramiz
    setIsAuthenticated(false); // 🔥 Holatni yangilaymiz
  
    console.log("🔴 Logout amalga oshdi");
  
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }], // ❌ "AuthStack" emas, "Auth" bo‘lishi kerak
    });
  };
  


  // ✅ Ma'lumot yuklanayotgan payt loading chiqadi

  return (
    <View className="flex-1 bg-cyan-500 justify-center items-center">

          <TouchableOpacity
            onPress={handleLogout}
            className="p-3 bg-red-500 rounded mt-4 w-full"
          >
            <Text className="text-white text-center font-bold">Log out</Text>
          </TouchableOpacity>
        </View>
  );
};

export default Profile;
