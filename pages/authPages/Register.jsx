import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { BASE_URL } from "../../connection/BaseUrl";
import { APP_API } from "../../connection/AppApi";
import Toast from "react-native-toast-message";
import { EmailStep } from "../../components/EmailStep";
import { RegisterFrom } from "../../components/RegisterFrom";
import { OtpStep } from "../../components/OtpStep";
import { validateEmail, validateOtp, validateRegister } from "../../utils/Validation";
import { registerUser, sendToEmail, verifyEmail } from "../../connection/service/AuthService";
import { handleChange, handleKeyPress } from "../../utils/Halpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTP_LENGTH = 6;

export const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef([]);
    const [secureText, setSecureText] = useState(true); // Parol ko‘rinishi

    
    const sendEmail = async () => {
        const errorMessage = validateEmail(email);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError("");
    
        try {
            const res = await sendToEmail(email);
    
            // Agar backenddan muvaffaqiyatli javob kelsa (statusCode 200 yoki 202)
            if (res?.success && res?.statusCode === 200) {
                Toast.show({type: "success", text1: 'Xabar yuborildi', text2: "Emailingizga kod yubordik"});
                setStep(2); // Kod yuborish sahifasiga o'tish
            } else if (res?.statusCode === 409) {
                // Email allaqachon ro'yxatdan o'tgan bo'lsa
                Alert.alert("Xatolik", "Bu email orqali avval ro'yhatdan o'tilgan");
            } else {
                // Boshqa xatolik holatlari

                Alert.alert("Xatolik", res?.message || "Noto‘g‘ri email yoki boshqa xatolik");
            }
        } catch (error) {
            Alert.alert("Xatolik", error.message || "Server xatoligi");
        }
    };
    
    

    const verifyOtp = async () => {
        const code = otp.join("");  // Otp kodni qo'shish
        const errorMessage = validateOtp(code);  // Kodni tekshirish
        if (errorMessage) {
            setError(errorMessage);  // Agar xatolik bo'lsa, uni ko'rsatish
            return;
        }
        setError("");
    
        try {
            const data = await verifyEmail(code,email);  // Email va kodni yuborish
            if (data?.success||data.statusCode===200) {
                setStep(3);  // Muvaffaqiyatli bo'lsa, keyingi qadamga o'tish
            } else {
                setError("Kod noto‘g‘ri, qayta urinib ko‘ring");
            }
        } catch (error) {
            setError(error.message);  // Xatolik yuzaga kelsa, uni ko'rsatish
        }
    };

    const register =async()=>{
        const errorMessage =validateRegister(name,lastName,password)
        if(errorMessage){
            setError(errorMessage)
            return
        }
        setError('')
        const data ={name,surname,password}
        const codeId=await AsyncStorage.getItem("user_id")
        try{
            const res =await registerUser(codeId,data)
            if(res){
                console.log("User royxatdan otti")
            }
        }catch(error){
            console.log("Registerda xatolik"+error)
        }
    }
    

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='flex-1 bg-neutral-900'>
            <ImageBackground source={require('../../assets/backronimg.jpg')} className='flex-1' />
            <LinearGradient 
                colors={['rgba(18,18,18,0.8)', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.90 }}
                locations={[0, 0.65]}
                className='top-0 absolute left-0 right-0 bottom-0'
            />
             

            <ScrollView className="flex-1 absolute p-5 w-full" keyboardShouldPersistTaps="handled">
                {step == 1 && (
                    <EmailStep 
                        email={email} 
                        setEmail={setEmail} 
                        error={error} 
                        sendEmail={sendEmail} 
                        navigation={navigation} 
                    />
                )}
                {step == 3 && (
                    <RegisterFrom 
                        name={name} 
                        lastName={lastName} 
                        password={password} 
                        setName={setName} 
                        setLastName={setLastName} 
                        setPassword={setPassword} 
                        secureText={secureText} 
                        setSecureText={setSecureText} 
                        error={error} 
                        register={register} 
                        navigation={navigation} 
                    />
                )}
            </ScrollView>
            
            <SafeAreaView className="absolute top-[150px] p-5 w-full">
                {step == 2 && (
                    <OtpStep 
                        otp={otp} 
                        inputRefs={inputRefs} 
                        error={error} 
                        handleChange={(text, index) => handleChange(text, index, otp, setOtp, inputRefs)} 
                        handleKeyPress={(e, index) => handleKeyPress(e, index, otp, inputRefs)} 
                        verifyOtp={verifyOtp} 
                        navigation={navigation}
                    />
                )}
            </SafeAreaView>
        </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
       
    );
};
