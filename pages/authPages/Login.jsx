import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert,KeyboardAvoidingView, ImageBackground, SafeAreaView, View, Platform } from 'react-native';
import { validateLogin } from '../../utils/Validation';
import { loginUser } from '../../connection/service/AuthService';
import { LoginFrom } from '../../components/LoginFrom';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [secureText, setSecureText] = useState(true);

    const handleLogin = async () => {
        const errorMessage = validateLogin(email, password);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError('');
    
        try {
            const data = await loginUser(email, password);
    
            if (!data || !data.user) {
                throw new Error("Foydalanuvchi ma'lumotlari topilmadi!");
            }
    
            Alert.alert("Muvaffaqiyatli", `Xush kelibsiz, ${data.user.name}!`);
    
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            const testUser = await AsyncStorage.getItem("user");
    
            navigation.reset({
                index: 0,
                routes: [{ name: "Profile" }],
            });
        } catch (error) {
            console.error("🔴 Xatolik:", error);
            Alert.alert("Xatolik", error.message || "Noma'lum xatolik yuz berdi");
        }
    };
    
    
    

    return (
        <View className="flex-1 bg-neutral-900">
        <ImageBackground 
            source={require('../../assets/backronimg.jpg')} 
            className="flex-1"
        >
            {/* Gradientni to‘g‘ri joylash uchun faqat rasm ustida ishlatish */}
           <LinearGradient
                colors={['rgba(18,18,18,0.8)', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.90 }}
                locations={[0, 0.65]}
                className="top-0 absolute left-0 right-0 bottom-0"
            />
    
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                className='flex-1 absolute w-full'
            >
                <SafeAreaView className="flex-1 bg-transparent p-5 w-full">
                    <LoginFrom
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        secureText={secureText}
                        setSecureText={setSecureText}
                        navigation={navigation}
                        error={error}
                        handleLogin={handleLogin}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
    
        </ImageBackground>
    </View>
    
    );
};
