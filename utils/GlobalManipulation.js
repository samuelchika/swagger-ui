import crypto from 'crypto'
import pkg from "rand-token";
import format from "date-fns/format/index.js";
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const { suid } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.dirname(__dirname);

export const encryptPassword = (password) => {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        password: genHash
    };
};

export const verifyPassword = async (password, hash, salt) => {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};

export const generateToken = () => {
    const epoch = new Date().getTime();
    const token = suid(20, epoch, 12);

    return token;
};

export const dateConvertion = (date) => {
    return format(date, "yyyy-MM-dd");
};

export const frontendUrl = "http://localhost:3000/";

export const createUserPayload = (user) => {
    // Convert `obj` to a key/value array
    // `[['name', 'isowo'], ['title', 'Mr'], ...]`
    const userArray = Object.entries(user);
    // remove password, salt and token from the user object
    const filtered = userArray.filter(
        ([key, value]) => (key !== "password" && key !== "salt" )
    );
    // Convert the key/value array back to an object:
    // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
    const filteredUser = Object.fromEntries(filtered);
    console.log(filteredUser)
    return filteredUser;

};

export const issueJWT = (user) => {
    // create jwt 
    // Read private key
    const id = user.id;
    const PRIV_KEY = fs.readFileSync(path.join(baseDir, "/keys/id_rsa_priv.pem"), 'utf-8');
    const expiresIn = '1d';

    const payload = {
        sub: id,
        iat: Date.now()
    };
    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }

}

export const issueJWTReg = (user) => {
    // create jwt 
    // Read private key
    console.log(user)
    const email = user.email;
    const PRIV_KEY = fs.readFileSync(path.join(baseDir, "/keys/id_rsa_priv.pem"), 'utf-8');
    const expiresIn = Date.now() + 86400000;
    console.log(expiresIn);

    const payload = {
        sub: email,
        iat: Date.now() , 
        expires: Date.now() + 86400000,        
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: "24h", algorithm: 'RS256' });

    return {
        token: signedToken,
        expires: expiresIn
    }

}

export const issueJWTGrab = (grabbedDetail) => {
    // create jwt 
    // Read private key
    // const _id = user.id;
    const PRIV_KEY = fs.readFileSync(path.join(baseDir, "/keys/id_rsa_priv.pem"), 'utf-8');
    // const expiresIn = '1d';

    const payload = {
        iat: Date.now(),
        grabbedDetail,
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, { algorithm: 'RS256' });

    return {
        token: signedToken
    }

}

export const verifyToken = (grabbedDetails) => {
    // get the token
    const PUB_KEY = fs.readFileSync(path.join(baseDir, "/keys/id_rsa_pub.pem"), 'utf-8');
    const grabbedProduct = jwt.verify(grabbedDetails, PUB_KEY, { algorithm: 'RS256'});

    return grabbedProduct;
}

export const getDirPath = (moduleUrl) => {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
}

export const registrationMessage = "Welcome to Isowo. You can sell or buy stuffs with us, open shop bla bla bla.."
