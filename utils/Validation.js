export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const validateEmail = (email) => {
    if (!email.trim()) return "Iltimos, emailni kiriting";
    if (!EMAIL_REGEX.test(email.trim())) return "Faqat @gmail.com emaili qabul qilinadi";
    return "";
};

export const validateRegister = (name, surname, password) => {
    if (!name.trim()) return "Ismingiz bo'sh qolib ketti";
    if (!surname.trim()) return "Familyangiz bo'sh qolib ketti";
    if (!password.trim()) return "Parol bo'sh qolib ketdi";
    if (password.length < 6) return "Parol 6 ta belgidan ko'p bo'lsin";
    return "";
};

export const validateOtp =(code)=>{
    if(!code.trim()) return "Iltimos kodni kiriting"
    if(code.length!==6) return "Kod xato iltimos kodni to'lliq kiriting"
    return "";
}