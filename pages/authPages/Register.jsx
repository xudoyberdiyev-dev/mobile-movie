import axios from "axios";
import { LinearGradient } from "expo-linear-gradient"
import { useRef, useState } from "react";
import { Alert, Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { BASE_URL } from "../../connection/BaseUrl";
import { APP_API } from "../../connection/AppApi";
import Toast from "react-native-toast-message";
import { EmailStep } from "../../components/EmailStep";
import { RegisterFrom } from "../../components/RegisterFrom";
import {OtpStep} from '../../components/OtpStep'
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

  const validateRegister=(name,surname,password)=>{
    if(!name.trim()) return "Ismingiz bo'sh qolib ketti"
    if(!surname.trim()) return "Familyangiz bo'sh qolib ketti"
    if(!password.trim()) return "Parol bo'sh qolib ketdi";
    if(password.length < 6) return "Parol 6 ta belgidan ko'p bo'lsin"
    return ""
  }

  const register =async()=>{
    const errorMessage = validateRegister(name, surname, password);
    if (errorMessage) { 
        setError(errorMessage);
        return;
    }
    setError("");  
    const data = { name, surname, password };
    try{
      const res = await axios.post(`${BASE_URL}/auth/register`,data)
      if(res.data.success){
        navigation.navigate('Home')
      }else{
        Alert.alert("Royxatdan otishda xatolik")
      }
    }catch(error){
      Alert.alert("Foydalanuvchi topilmadi")
    }
  }
   
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
     const verifyEmail = async () => {
        const code = otp.join(""); // 6 xonali kodni birlashtirish
        if(!code){
          setError("Iltimos kodni kiriting")
          return
        }
        if (code.length !== 6) {
          setError("Kod xato iltimos to'liq kodni kiriting")
          return;
        }
    
        try {
          const response = await axios.post(
            `${BASE_URL}/auth/verify`,
            null,
            { params: { code, email } }
          );
    
          if (response.data.success) {
            setStep(3) // Muvaffaqiyatli tasdiqlashdan keyin Home sahifaga yo‘naltirish
          } else {
            setError("kod xato qayta uruning")
          }
        } catch (error) {
          setError('kod xato qayta urining');
        }
      };

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

    return(
      <View className='flex-1 bg-neutral-900'>
        <ImageBackground source={require('../../assets/backronimg.jpg')} className='flex-1'/>
              <LinearGradient colors={['rgba(18,18,18,0.8)','#121212']}
              start={{x:0,y:0}}
              end={{x:0,y:0.90}}
              locations={[0,0.65]}
              className='top-0 absolute left-0 right-0 bottom-0'
              />
                <SafeAreaView className="flex-1 absolute p-5 w-full">
                  {step==3&&<EmailStep email={email} setEmail={setEmail} error={error} sendToEmail={sendToEmail} navigation={navigation}/>}
                  {step==1&&<RegisterFrom name={name} surname={surname} password={password} setName={setName} setSurname={setSurname} setPassword={setPassword} error={error} register={register} navigation={navigation}/>}
                </SafeAreaView>
                <SafeAreaView className="absolute top-[200px]  p-5 w-full ">
                  {step==2&&<OtpStep otp={otp} inputRefs={inputRefs} error={error} handleChange={handleChange} handleKeyPress={handleKeyPress} verifyEmail={verifyEmail}/>}
                </SafeAreaView>      
      </View>
    )
}

