import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import { APP_API } from "../AppApi";

export const sendToEmail = async (email) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/send-to`, null, { params: { email } });
        await AsyncStorage.setItem("user_id", String(data.message)); // ❌ Xato: `data.data.message` noto‘g‘ri bo‘lishi mumkin
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internet yoki server muammosi");
    }
};


export const verifyEmail = async (email, code) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/verify`, null, { params: { email, code } });

        if (data && data.message) {
            await AsyncStorage.setItem("user_id", data.data.message); // ✅ ID to‘g‘ri joydan olinadi
            console.log("User ID saqlandi:", data.data.message);
            return data;
        }   
    } catch (error) {
        console.log("Kod noto‘g‘ri, qayta urinib ko‘ring:", error);
    }
};

export const registerUser = async (data, navigation) => {
    const userId = await AsyncStorage.getItem("user_id");
    console.log("📌 Saqlangan user_id:", userId); // 🔍 user_id borligini tekshiramiz

    try {
        const response = await axios.post(
            `${BASE_URL}${APP_API.register}`, 
            data, 
            { params: { code_id: userId } }
        );

        console.log("✅ Ro‘yxatdan o‘tish javobi:", response.data); // 🔍 API javobini tekshiramiz

        if (response.data.success) {
            await AsyncStorage.removeItem("user_id"); // 🔹 Ro‘yxatdan o‘tgandan keyin user_id ni o‘chiramiz
            navigation.navigate("Person"); // 🔄 Profilga o‘tish
        }
    } catch (error) {
        console.log("❌ Register error:", error.response?.data || error);
    }
};

export const loginUser = async (email, password) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/login`, { user: { email, password } });

        if (data?.token) {
            await AsyncStorage.setItem("authToken", data.token); // ✅ Tokenni saqlash
            await AsyncStorage.setItem("user", JSON.stringify(data.user)); // ✅ User ma’lumotlarini saqlash
        }

        return data;
    } catch (error) {
        console.error("🔴 Axios xatolik:", error.response?.data);
        Toast.show({ type: "error", text1: "Xatolik", text2: "Email yoki parol xato" });
    }
};

export const getUser = async (userId, token, setUserData, setLoading) => {
    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/get-user-data/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                Alert.alert("Xatolik", "Avtorizatsiya muvaffaqiyatsiz!");
            } else {
                Alert.alert("Xatolik", `Xatolik kodi: ${error.response.status}`);
            }
        } else {
            Alert.alert("Xatolik", "Maʼlumotni olishda muammo yuz berdi");
        }
    }
    setLoading(false);
};
