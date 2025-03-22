    import { useNavigation } from '@react-navigation/native'
    import { LinearGradient } from 'expo-linear-gradient'
    import { Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
    import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'


    export const Login =()=>{
        const navigation =useNavigation()
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
            {/* Main Container */}
            <View className="flex-1 p-8 w-full mt-[70px]">
            {/* Title */}
            <Text className="text-white text-[34px] font-bold">Sign In</Text>
            <Text className="text-gray-400 text-[16px] mt-2">
                Sign in to your account below
            </Text>
    
            {/* Email Input */}
            <View className="flex-row items-center border-b border-gray-400 w-full mt-5 px-2 py-2">
                <FontAwesome5Icon name="envelope" size={24} color="white" />
                <TextInput
                className="flex-1 px-2 text-[16px] text-white"
                placeholder="Email"
                placeholderTextColor="gray"
                />
            </View>
    
            {/* Password Input */}
            <View className="flex-row items-center border-b border-gray-400 w-full mt-5 px-2 py-2">
                <FontAwesome5Icon name="lock" size={24} color="white" />
                <TextInput
                className="flex-1 px-2 text-[16px] text-white"
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                />
                <FontAwesome5Icon name="eye" size={24} color="white" />
            </View>
    
            {/* Forget Password */}
            <TouchableOpacity onPress={()=>navigation.navigate('Forgot')}>
                <Text className="text-red-500 text-right mt-3">Forget Password?</Text>
            </TouchableOpacity>
    
            {/* Social Login Buttons */}
            <TouchableOpacity>
            <View className="flex-row justify-center items-center mt-5 bg-red-600 rounded-[12px] h-[50px] cursor-pointer">
                <Text className='text-white text-xl'>Sign In</Text>
            </View>
            </TouchableOpacity>
            <View className="relative w-full items-center mt-10 h-0.5 bg-gray-300">
                 <Text className="absolute -top-2 bg-[#121212] px-3 text-gray-500">Or</Text>
            </View>
            <View className="flex-row justify-center items-center mt-5 bg-gray-800 rounded-[12px] h-[50px] cursor-pointer">
                <Image source={require('../../assets/images/google.png')} className='w-10 h-10 mx-2'/>
            </View>
           
            <View className="flex-row justify-center mt-10">
                <Text className="text-gray-400">Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-blue-500">Sign Up</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
        </View>
        )
    }