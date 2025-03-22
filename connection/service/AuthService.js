import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const registerUser = async (name, surname, password) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/register`, { name, surname, password });
        return data;
    } catch (error) {
        throw new Error("Foydalanuvchi topilmadi");
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
        throw new Error("Kod noto‘g‘ri, qayta urinib ko‘ring");
    }
};