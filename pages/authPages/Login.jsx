import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, ImageBackground, SafeAreaView, View } from 'react-native';
import { validateLogin } from '../../utils/Validation';
import { loginUser } from '../../connection/service/AuthService';
import { LoginFrom } from '../../components/LoginFrom';

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
            console.log("🔵 Login javobi:", data); // Javobni tekshirish
            Alert.alert("Muvaffaqiyatli", `Xush kelibsiz, ${data.foundUser.email}!`);
            navigation.replace("Profile");
        } catch (error) {
            console.error("🔴 Xatolik:", error); // Xatoni tekshirish
            Alert.alert("Xatolik", error.message);
        }
    };
    

    return (
        <View className="flex-1 bg-neutral-900">
            <ImageBackground source={require('../../assets/backronimg.jpg')} className="flex-1" />
            <LinearGradient
                colors={['rgba(18,18,18,0.8)', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.90 }}
                locations={[0, 0.65]}
                className="top-0 absolute left-0 right-0 bottom-0"
            />
            <SafeAreaView className="flex-1 absolute p-5 w-full">
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
        </View>
    );
};
