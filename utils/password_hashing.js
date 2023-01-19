

import bcrypt from 'bcrypt';

const hashPassword = async(password)=>{
    const salt_rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    return await bcrypt.hash(password,salt_rounds);
}

const comparePasswords = async({enteredPassword,storedPassword})=>{
    return await bcrypt.compare(enteredPassword,storedPassword);
}

export {
    hashPassword,
    comparePasswords
}