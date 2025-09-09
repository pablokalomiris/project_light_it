export const validateFullName = (name: string) => /^[A-Za-z\s]+$/.test(name);
export const validateEmail = (email: string) => /^[\w.-]+@gmail\.com$/.test(email);
export const validatePhone = (phone: string) => /^[0-9]{5,15}$/.test(phone);
export const validatePhoto = (file: File) => file.type === 'image/jpeg';
