import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { APP_API } from "../AppApi";

/** Emailga kod yuborish */
export const sendToEmail = async (email) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/send-to`, null, { params: { email } });
        if (data?.userId) {
            await AsyncStorage.setItem("user_id", String(data.user?.id));
        }
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internet yoki server muammosi");
    }
};

/** Kodni tasdiqlash */
export const verifyEmail = async (email, code) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/verify`, null, { params: { email, code } });

        if (data?.userId) {
            await AsyncStorage.setItem("user_id", String(data.user?.id));
            return data;
        }
    } catch (error) {
        console.log("Kod noto‘g‘ri, qayta urinib ko‘ring:", error.response?.data?.message);
    }
};

/** Ro‘yxatdan o‘tish */
export const registerUser = async (data, navigation) => {
    const userId = await AsyncStorage.getItem("user_id");
    console.log("📌 Saqlangan user_id:", userId);

    try {
        const response = await axios.post(`${BASE_URL}${APP_API.register}`, { ...data, code_id: userId });

        if (response.data?.success) {
            await AsyncStorage.removeItem("user_id");
            navigation.navigate("Person");
        }
    } catch (error) {
        console.log("❌ Ro‘yxatdan o‘tishda xatolik:", error.response?.data?.message);
    }
};

/** Tizimga kirish */
export const loginUser = async (email, password) => {
  try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, { user: { email, password } });

      if (data?.token) {
          await AsyncStorage.setItem("authToken", data.token);
          await AsyncStorage.setItem("user_id", String(data.user?.id));

          const checkUserId = await AsyncStorage.getItem("user_id"); // ✅ Tekshirildi
          console.log("✅ Saqlangan user_id:", checkUserId);
      }
      return data;
  } catch (error) {
      Toast.show({ type: "error", text1: "Xatolik", text2: "Email yoki parol xato" });
  }
};


/** Email tasdiqlash kodini yuborish */
export const sendVerifyEmail = async (email) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/send-verify-code-for-password`, null, { params: { email } });

        if (data?.success) {
            await AsyncStorage.setItem("reset_email", email);
            return data;
        }
        throw new Error(data?.message || "Email tasdiqlashda xatolik");
    } catch (error) {
        Toast.show({ type: 'error', text1: 'Email tasdiqlanmadi', text2: error.response?.data?.message || "Xatolik yuz berdi" });
        return null;
    }
};

/** Parolni tasdiqlash */
export const sendVerifyPassword = async (code, email) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/verification-for-password`, { code, email });

        if (data?.success && data?.id) {
            await AsyncStorage.setItem('user_id', String(data.id));
            return data;
        }
        throw new Error(data?.message || "Kod noto‘g‘ri");
    } catch (error) {
        Toast.show({ type: 'error', text1: 'Kod noto‘g‘ri', text2: error.response?.data?.message || "Qayta urinib ko‘ring" });
        return null;
    }
};


/** Parolni tiklash */
export const sendResetPassword = async (password) => {
    try {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) throw new Error("User ID topilmadi");

        const { data } = await axios.post(`${BASE_URL}${APP_API.resetPassword}/${userId}`, { password });

        if (data?.success) return data;
        throw new Error(data?.message || "Parolni tiklashda xatolik");
    } catch (error) {
        Toast.show({ type: 'error', text1: 'Parol o‘zgartirilmadi', text2: error.response?.data?.message || "Qayta urinib ko‘ring" });
        return null;
    }
};

/** Foydalanuvchi ma'lumotlarini olish */
// export const getUserData = async () => {
//   try {
//     const token = await AsyncStorage.getItem("authToken");
//     const userId = await AsyncStorage.getItem("user_id");

//     console.log("📌 AsyncStorage dan olingan user_id:", userId);

//     if (!userId || !token) {
//       console.log("❌ User ID yoki token topilmadi");
//       return null;
//     }

//     const { data } = await axios.get(`${BASE_URL}/get-user-data/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     console.log("✅ Backend javobi:", data);
//     return data;
//   } catch (error) {
//     console.log("⚠️ getUserData xatosi:", error);
//     return null;
//   }
// };
