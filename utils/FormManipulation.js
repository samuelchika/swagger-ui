import { encryptPassword, generateToken, dateConvertion, issueJWTReg } from './GlobalManipulation.js';


export const UserFormManipulation = (user) => {
    user = (user?.subscribe === "true") ? { ...user, subscribe: 1 } :  { ...user, subscribe: 0 }
    if (!parseInt(user.phone)) {return new Error("Phone must be a number.")}
    if (user?.password) {
        const { salt, password } = encryptPassword(user.password);
        user = { ...user, salt, password } 
    }
    // * change the date to an acceptable format for MySQL
    // * add a token to this user, to be used to send an email to the user for redirecting them back to our website.
    user = { ...user, token: issueJWTReg(user).token, dateOfBirth: dateConvertion(new Date(user.dateOfBirth)) }
    return user;    
}

