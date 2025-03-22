import {Text, TextInput, TouchableOpacity, View } from "react-native"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

export const EmailStep =({email,setEmail,error,sendToEmail,navigation})=>{
    return(
        <View className="flex-1 p-8 w-full mt-[70px]">
                        {/* Title */}
                        <Text className="text-white text-[34px] font-bold">Sign In</Text>
                        <Text className="text-gray-400 text-[16px] mt-2">
                            Sign in to your account below
                        </Text>
                
                        {/* Email Input */}
                        <View className="flex-row  items-center border-b border-gray-400 w-full mt-5 px-2 py-2">
                            <FontAwesome5Icon name="envelope" size={24} color="white" />
                            <TextInput
                            className="flex-1 px-2 text-[16px] text-white"
                            placeholder="Email"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={text => setEmail(text)} 
                            />
                        </View>

                        <View className="min-h-[20px]">
                            {error ? <Text className="text-red-500">{error}</Text> : null}
                        </View>              
                        {/* Forget Password */}
                        <TouchableOpacity onPress={()=>navigation.navigate('Forgot')}>
                            <Text className="text-red-500 text-right mt-1.5">Forget Password?</Text>
                        </TouchableOpacity>
                
                        {/* Social Login Buttons */}
                        <TouchableOpacity onPress={sendToEmail}>
                        <View className="flex-row justify-center items-center mt-8 bg-red-600  rounded-[12px] h-[50px] ">
                          <Text className='text-white text-xl'>Kodni Olish</Text>
                            {/* <Image source={require('../assets/images/google.png')} className="w-10 h-10 mx-2" /> */}
                        </View>
                        </TouchableOpacity>
                        
        
                
                        {/* Sign Up Link */}
                        <View className="flex-row justify-center mt-10">
                            <Text className="text-gray-400">Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-blue-500">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
    )
}