import {Text, TextInput, TouchableOpacity, View } from "react-native"

export const OtpStep =({otp, inputRefs, handleChange, handleKeyPress, verifyEmail})=>{
    return(
        <View className="w-full max-w-sm bg-transparent">
                          <Text className="text-white text-xl font-bold text-center">
                              Emailingizdagi Kodni Kiriting 
                          </Text>
                          <Text className="text-gray-400 text-center mt-2">
                              Emailingizga 6 xil sondan iborat kod yubordik
                          </Text>
                  
                          {/* OTP Input Fields */}
                          <View className="flex-row justify-center mt-5 space-x-2">
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
                  
                          {/* Submit Button */}
                          <TouchableOpacity  onPress={verifyEmail}
                              className="mt-6 bg-red-600 py-3 rounded-lg self-center w-full max-w-xs"
                          >
                              <Text className="text-white text-center text-lg font-semibold">
                                  Kodni kiritish
                              </Text>
                          </TouchableOpacity>
                      </View>
    )
}