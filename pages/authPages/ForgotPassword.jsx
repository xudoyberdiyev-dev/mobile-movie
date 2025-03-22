import React, { useRef, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ForgotPassword = () => {
   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
   const inputRefs = useRef([]);

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

   return (
    
      <View className="flex-1 justify-center items-center bg-gradient-to-b from-purple-300 to-blue-300">
         <View className="bg-neutral-900 p-6 rounded-xl w-[90%] max-w-sm shadow-lg">
            <Text className="text-white text-xl font-bold text-center">Emailingizdagi Kodni Kiriting </Text>
            <Text className="text-gray-400 text-center mt-2">
               Emailngizga 6 xil sondan iborat kod yubordik
            </Text>

            {/* OTP Input Fields */}
            <View className="flex-row justify-between mt-5">
               {otp.map((digit, index) => (
                  <TextInput
                     key={index}
                     className="w-12 h-12 bg-gray-800 text-white text-center text-xl rounded-md border border-gray-700"
                     keyboardType="numeric"
                     maxLength={1}
                     value={digit}
                     ref={(el) => (inputRefs.current[index] = el)}
                     onChangeText={(text) => handleChange(text, index)}
                     onKeyPress={(e) => handleKeyPress(e, index)}
                  />
               ))}
            </View>

            <TouchableOpacity className="mt-6 bg-red-600 bg-gradient-to-r from-blue-600 to-purple-500 py-3 rounded-[12px]">
               <Text className="text-white text-center text-xl font-semibold">Kodni kiritish</Text>
            </TouchableOpacity>
         </View>
      </View>

   );
};

export default ForgotPassword;
