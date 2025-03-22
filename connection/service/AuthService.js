import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import { BASE_CONFIG } from "../BaseConfig";
import { APP_API } from "../AppApi";
import Toast from "react-native-toast-message";

export const VerifyToEmail =async({data,setError,setStep})=>{
    const validations = [
        { check: data.email.trim().length === 0, message: 'Itimos, emailni kiriting' },
        { check: !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(data.email.trim()), message: 'Faqat @gmail.com emaili qabul qilinadi' }
    ];
    for(const validation of validations ){
        if(validation.check){
             setError(validation.message)
             return
        }
    }
    setError("")
    try{
        const res = await BASE_CONFIG.doPost(APP_API.sentToEmail, null, { params: { email: data.email }});
        if(res.data.success){
            Toast.show({
                type:'success',
                test1:"Muaffaqiyatli",
                text2:res.data.message,
                visibilityTime:1500,
                position:"top"
            })
            setStep(2)
        }else{
            Toast.show({
                type:'error',
                test1:"Xatolik",
                text2:res.data.message,
                visibilityTime:1500,
                position:"top"
            })
        }
    }catch(error){
        setError("Emilda jonatishda muammo yuzaga keldi iltimos qayta uruning")
    }
}


