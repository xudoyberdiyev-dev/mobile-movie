import React, { useRef, useState } from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

import { ForgotEmail } from '../../components/EmailStep';
import { OtpForgot } from '../../components/OtpStep';
import { NewPassword } from '../../components/NewPassword';

import { validateEmail, validateOtp, validatePassword } from '../../utils/Validation';
import { sendResetPassword, sendVerifyEmail, sendVerifyPassword } from '../../connection/service/AuthService';
import { handleChange, handleKeyPress } from '../../utils/Halpers';

const OTP_LENGTH = 6;

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [password,setPassword]=useState('')
  const [prePassword,setPrePassword]=useState('')
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const [secureText, setSecureText] = useState(true);

  const verifyEmail = async () => {
    const errorMessage = validateEmail(email);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError('');

    try {
      const res = await sendVerifyEmail(email);
      if (res.success) {
        Toast.show({
          type: 'success',
          text1: 'Qabul qilindi',
          text2: 'Kiritgan emailingizga kod yubordik',
        });
        setStep(2);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Xatolik',
          text2: 'Nimadr xato keti qayta uruning',
        });
      }
    } catch (error) {
      console.log('Xatolik: ' + error.message);
    }
  };

  const verifyPassword = async () => {
    const code = otp.join('');
    const errorMessage = validateOtp(code);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError('');

    try {
      const data = await sendVerifyPassword(email, code);
      if (data.success) {
        setStep(3);
      } else {
        setError("Kod noto‘g‘ri, qayta urinib ko‘ring");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const resetPassword =async ()=>{
    const errorMessage = validatePassword(password,prePassword);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError('');
    try{
     const {data} =  await sendResetPassword(password)
     if(data.success){
      Toast.show({ type: 'success', text1: 'Parol o‘zgartirildi' });
      navigation.navigate('Login'); 
     }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <ImageBackground source={require('../../assets/backronimg.jpg')} className="flex-1" />
      <LinearGradient
        colors={['rgba(18,18,18,0.8)', '#121212']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        locations={[0, 0.65]}
        className="top-0 absolute left-0 right-0 bottom-0"
      />

      <SafeAreaView className="flex-1 absolute p-5 w-full">
        {step === 1 && <ForgotEmail email={email} setEmail={setEmail} error={error} verifyEmail={verifyEmail} />}
        {step === 2 && (
          <OtpForgot
            otp={otp}
            inputRefs={inputRefs}
            error={error}
            handleChange={(text, index) => handleChange(text, index, otp, setOtp, inputRefs)}
            handleKeyPress={(e, index) => handleKeyPress(e, index, otp, inputRefs)}
            verifyPassword={verifyPassword}
            navigation={navigation}
          />
        )}
        {step === 3 && <NewPassword />}
      </SafeAreaView>
    </View>
  );
};

export default ForgotPassword;
