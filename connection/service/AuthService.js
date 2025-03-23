import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";



export const registerUser = async (codeId, name, surname, password) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/register`, 
            { 
                code_id: codeId, // UUIDni to‘g‘ri jo‘natamiz
                name, 
                surname, 
                password 
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        Toast.show({
            type: "success",
            text1: "Muvaffaqiyatli!",
            text2: "Foydalanuvchi ro‘yxatdan o‘tkazildi.",
        });
        return data;
    } catch (error) {
        console.log("Xatolik:", error.response?.data || error.message);
        Toast.show({
            type: "error",
            text1: "Xatolik!",
            text2: error.response?.data?.message || "Foydalanuvchi topilmadi!",
        });
        throw new Error(error.response?.data?.message || "Xatolik yuz berdi");
    }
};

export const sendToEmail = async (email) => {
    try {
        const  {data}  = await axios.post(`${BASE_URL}/auth/send-to`, null, { params: { email } });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internet yoki server muammosi");
    }
};

export const verifyEmail = async (email, code) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/verify`, null, { params: { email, code } });
        return data;
    } catch (error) {
        console.log(error+"Kod noto‘g‘ri, qayta urinib ko‘ring")
    }
};

export const loginUser = async (email, password) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/login`, { user: { email, password } });

        if (data?.token) {
            await AsyncStorage.setItem("authToken", data.token); // Tokenni saqlash
            await AsyncStorage.setItem("user", JSON.stringify(data.user)); // User ma’lumotlarini saqlash
        }
        return data;
    } catch (error) {
        console.error("🔴 Axios xatolik:", error.response?.data);
        Toast.show({type:'error',text1:"Xatolik",text2:'Email yoki parol xato'})
    }
};

export const getUser =async(userId,token,setUserData,setLoading)=>{
    try{

        const response = await axios.get(`${BASE_URL}/get-user-data/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setUserData(response.data);
    }catch (error) {
            if (error.response) {
              if (error.response.status === 401) {
                Alert.alert('Xatolik', 'Avtorizatsiya muvaffaqiyatsiz!');
              } else {
                Alert.alert('Xatolik', `Xatolik kodi: ${error.response.status}`);
              }
            } else {
              Alert.alert('Xatolik', 'Maʼlumotni olishda muammo yuz berdi');
            }
          } finally {
            setLoading(false);
          }
        
        };