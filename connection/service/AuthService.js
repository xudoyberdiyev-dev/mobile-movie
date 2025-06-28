import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { APP_API } from "../AppApi";
import { Alert } from "react-native";

/** Emailga kod yuborish */
export const sendToEmail = async (email) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/send-to`, null, { params: { email } });

        // StatusCode 409 bo'lsa, email ro'yxatdan o'tganini bildiradi
        if (data?.statusCode === 409) {
            return { success: false, message: data?.message || "Bu email allaqachon ro'yxatdan o'tgan", statusCode: 409 };
        }

        return data; // Kod yuborilganini bildirgan javob
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internet yoki server muammosi");
    }
};
/** Kodni tasdiqlash */
export const verifyEmail = async (code,email) => {
    try {
        // Backendga so'rov yuborish
        const response = await axios.post(`${BASE_URL}/auth/verify`, null, {
            params: {code,email },
        });

        // Backend javobini tekshirish
        if (response.data.success) {
            // Javob muvaffaqiyatli bo'lsa, keyingi qadamni bajarish
            Alert.alert('Muvaffaqiyat', 'Verifikatsiya muvaffaqiyatli yakunlandi!');
            await AsyncStorage.setItem("user_id", response.data.message);  // `response.data.message` dan saqlash
        } else {
            // Kod noto'g'ri bo'lsa
            Alert.alert('Xatolik', 'Kod noto‘g‘ri, qayta urinib ko‘ring');
        }
    } catch (error) {
        // Xatolik yuzaga kelgan bo'lsa
        console.error(error);
        Alert.alert('Xatolik', error.response?.data?.message || 'Server xatoligi');
    }
};

/** Ro‘yxatdan o‘tish */
export const registerUser = async (codeId, name, lastName, password) => {
    try {
        // Backendga so'rov yuborish
        const response = await axios.post(
            `${BASE_URL}/register`,
            {
                name,
                lastName,
                password
            },
            {
                params: { code_id: codeId } // Query param sifatida ID yuboriladi
            }
        );

        // Javob muvaffaqiyatli bo'lsa
        if (response.data.success) {
            Alert.alert("Muvaffaqiyat", "Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi!");

            // User ID yoki boshqa ma'lumotlarni saqlash
            await AsyncStorage.setItem("user_id", codeId);

            return response.data;
        } else {
            Alert.alert("Xatolik", response.data.message);
            return null;
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Xatolik", error.response?.data?.message || "Server xatoligi");
        return null;
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
