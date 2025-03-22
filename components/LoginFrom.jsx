import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export const LoginFrom = ({ email, setEmail, password, setPassword, error, navigation, secureText, setSecureText, handleLogin }) => {
    return (
        <View className="flex-1 p-8 w-full mt-[70px]">
            <Text className="text-white text-[34px] font-bold">Sign In</Text>
            <Text className="text-gray-400 text-[16px] mt-2">
                Sign in to your account below
            </Text>

            <View className="flex-row items-center border-b border-gray-400 w-full mt-5 px-2 py-2">
                <FontAwesome5Icon name="envelope" size={24} color="white" />
                <TextInput
                    className="flex-1 px-2 text-[16px] text-white"
                    placeholder="Email"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    />
            </View>
            <View className="min-h-[20px]">
                {error?.toLowerCase().includes("email") && (
                    <Text className="text-red-500">{error}</Text>
                )}
            </View>

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
                {error?.toLowerCase().includes("password") && (
                    <Text className="text-red-500">{error}</Text>
                )}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                <Text className="text-red-500 text-right mt-2">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
                <View className="flex-row justify-center items-center mt-5 bg-red-600 rounded-[12px] h-[50px]">
                    <Text className='text-white text-xl'>Sign In</Text>
                </View>
            </TouchableOpacity>

            <View className="relative w-full items-center mt-7 h-0.5 bg-gray-300">
                <Text className="absolute -top-2 bg-[#121212] px-3 text-gray-500">Or</Text>
            </View>

            <View className="flex-row justify-center items-center mt-5 bg-gray-800 rounded-[12px] h-[50px]">
                <Image source={require('../assets/images/google.png')} className='w-10 h-10 mx-2' />
            </View>

            <View className="flex-row justify-center mt-4">
                <Text className="text-gray-400">Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text className="text-blue-500">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};
