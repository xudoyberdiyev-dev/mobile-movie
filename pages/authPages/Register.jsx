import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Alert, ImageBackground, SafeAreaView, View } from "react-native";
import { BASE_URL } from "../../connection/BaseUrl";
import { APP_API } from "../../connection/AppApi";
import Toast from "react-native-toast-message";
import { EmailStep } from "../../components/EmailStep";
import { RegisterFrom } from "../../components/RegisterFrom";
import { OtpStep } from "../../components/OtpStep";
import { validateEmail, validateOtp, validateRegister } from "../../utils/Validation";
import { registerUser, sendToEmail, verifyEmail } from "../../connection/service/AuthService";
import { handleChange, handleKeyPress } from "../../utils/Halpers";

const OTP_LENGTH = 6;

export const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef([]);
    const [secureText, setSecureText] = useState(true); // Parol ko‘rinishi

    const register = async () => {
        const errorMessage = validateRegister(name, surname, password);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError("");

        try {
            const res = await registerUser(name, surname, password);
            if (res.success) {
                navigation.navigate("Home");
            } else {
                Alert.alert("Ro'yxatdan o'tishda xatolik");
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const sendEmail = async () => {
        const errorMessage = validateEmail(email);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError("");

        try {
            const data = await sendToEmail(email);
            if (data.success) {
                setStep(2);
            } else {
                Alert.alert("Xatolik", data.message);
            }
        } catch (error) {
            Alert.alert("Xatolik", error.message);
        }
    };

    const verifyOtp = async () => {
        const code = otp.join("");
        const errorMessage = validateOtp(code);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError("");

        try {
            const data = await verifyEmail(email, code);
            if (data.success) {
                setStep(3);
            } else {
                setError("Kod noto‘g‘ri, qayta urinib ko‘ring");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View className='flex-1 bg-neutral-900'>
            <ImageBackground source={require('../../assets/backronimg.jpg')} className='flex-1' />
            <LinearGradient 
                colors={['rgba(18,18,18,0.8)', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.90 }}
                locations={[0, 0.65]}
                className='top-0 absolute left-0 right-0 bottom-0'
            />
            
            <SafeAreaView className="flex-1 absolute p-5 w-full">
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
                        surname={surname} 
                        password={password} 
                        setName={setName} 
                        setSurname={setSurname} 
                        setPassword={setPassword} 
                        secureText={secureText} 
                        setSecureText={setSecureText} 
                        error={error} 
                        register={register} 
                        navigation={navigation} 
                    />
                )}
            </SafeAreaView>
            
            <SafeAreaView className="absolute top-[200px] p-5 w-full">
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
    );
};
