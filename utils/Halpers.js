// utils/helpers.js
export const handleChange = (text, index, otp, setOtp, inputRefs) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
    }
};

export const handleKeyPress = (e, index, otp, inputRefs) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
    }
};
