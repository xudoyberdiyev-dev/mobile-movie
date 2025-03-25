import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../connection/service/AuthService";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Foydalanuvchi ma'lumotlarini olish
  const getUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      if (!userId) {
        console.log("❌ User ID topilmadi");
        return;
      }

      const { data } = await getUser(userId);
      setUser(data);
    } catch (error) {
      console.log("⚠️ getUserData xatosi:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout funksiyasi
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("authToken");

    console.log("🔴 Logout amalga oshdi");

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  // ✅ Ma'lumot yuklanayotgan payt loading chiqadi
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-cyan-500">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cyan-500 justify-center items-center">
      {user ? (
        <View className="p-5 bg-white rounded-xl shadow-md w-80 items-center">
          <Text className="text-lg font-bold text-black">Ism: {user.name}</Text>
          <Text className="text-lg font-bold text-black">
            Familya: {user.lastName}
          </Text>
          <Text className="text-lg font-bold text-black">
            Email: {user.email}
          </Text>

          <TouchableOpacity
            onPress={handleLogout}
            className="p-3 bg-red-500 rounded mt-4 w-full"
          >
            <Text className="text-white text-center font-bold">Log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text className="text-red-500 text-lg font-bold">Xatolik oka</Text>
      )}
    </View>
  );
};

export default Profile;
