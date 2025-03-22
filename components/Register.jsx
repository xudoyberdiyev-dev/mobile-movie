import axios from "axios";
import { LinearGradient } from "expo-linear-gradient"
import { useRef, useState } from "react";
import { Alert, Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { BASE_URL } from "../connection/BaseUrl";
import { APP_API } from "../connection/AppApi";
import Toast from "react-native-toast-message";
import { EmailStep } from "./EmailStep";
import { RegisterFrom } from "./RegisterFrom";
import { OtpStep } from "./OtpStep";

//improt

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const OTP_LENGTH = 6;
export const Register=({navigation})=>{
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);


  const validateEmail = (email) => {
    if (!email.trim()) return "Iltimos, emailni kiriting";
    if (!EMAIL_REGEX.test(email.trim())) return "Faqat @gmail.com emaili qabul qilinadi";
    return "";
  };
   
    const sendToEmail = async () => {
      const errorMessage = validateEmail(email);
      if (errorMessage) {
      setError(errorMessage);
      return;
      }
      setError("");    
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/send-to`, null, {
          params: { email },
        });
  
        if (data.success) {
          setStep(2);
        } else {
          Alert.alert("Xatolik", data.message);
        }
      } catch (error) {
        const message =
          error.response?.data?.message || "Internet bilan bog‘liq muammo yoki server ishlamayapti";
        Alert.alert("Xatolik", `Kod: ${error.response?.status || "Noma'lum"}, ${message}`);
      }
  }
    
    const handleChange = (text, index) => {
        if (text.length > 1) return; // Faqat 1 ta belgi kiritish mumkin
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
  
        if (text && index < inputRefs.current.length - 1) {
           inputRefs.current[index + 1].focus(); // Keyingi katakka o'tish
        }
     };
  
     const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
           inputRefs.current[index - 1].focus(); // Oldingi katakka o'tish
        }
     };
     const verifyEmail = async () => {
        const code = otp.join(""); // 6 xonali kodni birlashtirish
        if (code.length !== 6) {
          Alert.alert("Xatolik", "Iltimos, to‘liq kodni kiriting.");
          return;
        }
    
        try {
          const response = await axios.post(
            `${BASE_URL}/auth/verify`,
            null,
            { params: { code, email } }
          );
    
          if (response.data.success) {
            Alert.alert("Muvaffaqiyat!", "Email tasdiqlandi!");
            setStep(3) // Muvaffaqiyatli tasdiqlashdan keyin Home sahifaga yo‘naltirish
          } else {
            Alert.alert("Xatolik", response.data.message);
          }
        } catch (error) {
          Alert.alert("Xatolik", "Server bilan bog‘lanishda muammo yuz berdi.");
        }
      };
  

    return(
      <View className='flex-1 bg-neutral-900'>
              <ImageBackground source={require('../assets/backronimg.jpg')} className='flex-1'/>
              <LinearGradient colors={['rgba(18,18,18,0.8)','#121212']}
              start={{x:0,y:0}}
              end={{x:0,y:0.90}}
              locations={[0,0.65]}
              className='top-0 absolute left-0 right-0 bottom-0'
              />
                <SafeAreaView className="flex-1 absolute p-5 w-full">
                  {step==1&&<EmailStep email={email} setEmail={setEmail} error={error} sendToEmail={sendToEmail} navigation={navigation}/>}
                  {step==3&&<RegisterFrom email={email} setEmail={setEmail} error={error} sendToEmail={sendToEmail} navigation={navigation}/>}
                </SafeAreaView>
                <SafeAreaView className="absolute top-[200px]  p-5 w-full ">
                  {step==2&&<OtpStep otp={otp} inputRefs={inputRefs} handleChange={handleChange} handleKeyPress={handleKeyPress} verifyEmail={verifyEmail}/>}
                </SafeAreaView>      
      </View>
    )
}

