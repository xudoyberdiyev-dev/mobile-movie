import { ArrowLeft } from "lucide-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const OtpStep = ({ navigation, otp, error, inputRefs, handleChange, handleKeyPress, verifyOtp }) => {
  return (
    <View className="w-full max-w-sm bg-transparent relative pt-10">
      
      {/* Back Button */}
        <TouchableOpacity 
            onPress={() => navigation.replace("Register")}
            className="absolute top-[-120px] left-2 p-3 rounded-full bg-gray-800">
            <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
      {/* Title */}
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

      {/* Error Message */}
      <View className="min-h-[20px] mt-2 justify-center items-center">
        {error ? <Text className="text-red-500">{error}</Text> : null}
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        onPress={verifyOtp}
        className="mt-7 bg-red-600 py-3 rounded-lg self-center w-full max-w-xs"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Kodni kiritish
        </Text>
      </TouchableOpacity>

    </View>
  );
};
export const OtpForgot =({ navigation, otp, error, inputRefs, handleChange, handleKeyPress, verifyPassword })=>{
  return(
    <View className="w-full max-w-sm bg-transparent relative pt-10">
      
    {/* Back Button */}
      <TouchableOpacity 
          onPress={() => navigation.replace("Register")}
          className="absolute top-[-120px] left-2 p-3 rounded-full bg-gray-800">
          <ArrowLeft size={24} color="white" />
      </TouchableOpacity>
    {/* Title */}
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

    {/* Error Message */}
    <View className="min-h-[20px] mt-2 justify-center items-center">
      {error ? <Text className="text-red-500">{error}</Text> : null}
    </View>

    {/* Submit Button */}
    <TouchableOpacity 
      onPress={verifyPassword}
      className="mt-7 bg-red-600 py-3 rounded-lg self-center w-full max-w-xs"
    >
      <Text className="text-white text-center text-lg font-semibold">
        Kodni kiritish
      </Text>
    </TouchableOpacity>

  </View>
  )
}