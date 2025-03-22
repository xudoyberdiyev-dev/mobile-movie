import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export const RegisterFrom = ({
  name,
  setName,
  surname,
  setSurname,
  password,
  setPassword,
  secureText,
  setSecureText,
  error,
  register,
  navigation,
}) => {
  return (
    <View className="flex-1 p-8 w-full mt-[70px]">
      {/* Title */}
      <Text className="text-white text-[34px] font-bold">Sign In</Text>
      <Text className="text-gray-400 text-[16px] mt-2">
        Sign in to your account below
      </Text>

      {/* Email Input */}
      <View className="flex-row items-center border-b border-gray-400 w-full px-2 py-2">
        <FontAwesome5Icon name="user" size={24} color="white" />
        <TextInput
          className="flex-1 px-2 text-[16px] text-white"
          placeholder="Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View className="min-h-[20px]">
        {error.includes("Ismingiz") && (
          <Text className="text-red-500">{error}</Text>
        )}
      </View>

      <View className="flex-row items-center border-b border-gray-400 w-full px-2 py-2">
        <FontAwesome5Icon name="user" size={24} color="white" />
        <TextInput
          className="flex-1 px-2 text-[16px] text-white"
          placeholder="Surname"
          placeholderTextColor="gray"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
      </View>
      <View className="min-h-[20px]">
        {error.includes("Familyangiz") && (
          <Text className="text-red-500">{error}</Text>
        )}
      </View>

      {/* Password Input */}
      <View className="flex-row items-center border-b border-gray-400 w-full px-2 py-2">
        <FontAwesome5Icon name="lock" size={24} color="white" />
        <TextInput
          className="flex-1 px-2 text-[16px] text-white"
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={secureText}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          {secureText ? (
            <FontAwesome5Icon name="eye" size={24} color="white" />
          ) : (
            <FontAwesome5Icon name="eye-slash" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <View className="min-h-[20px]">
        {error.includes("Parol") && (
          <Text className="text-red-500">{error}</Text>
        )}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
        <Text className="text-red-500 text-right mt-2">Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={register}>
        <View className="flex-row justify-center items-center mt-6 bg-red-600 rounded-[12px] h-[50px]">
          <Text className="text-white text-xl">Ro'yxatdan o'tish</Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-5">
        <Text className="text-gray-400">Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-blue-500">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
