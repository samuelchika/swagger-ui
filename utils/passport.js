import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { toDate } from 'date-fns';
import ExpressError from './ExpressError.js';

import User from '../models/User.js';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUserPayload } from './GlobalManipulation.js';


const error = new ExpressError("Your session has expired, Please Login again.", 401);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.dirname(__dirname);

const PUB_KEY = fs.readFileSync(path.join(baseDir, "/keys/id_rsa_pub.pem"), 'utf-8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const strategy = new Strategy(options, async (jwt_payload, done) => {
    try {
        //console.log(jwt_payload)
        //console.log("User bypass login");
        const iat = toDate(jwt_payload.iat);
        const exp = toDate(jwt_payload.expires);
        const todaysDate = toDate(Date.now());
        //console.log(Date.now() >= jwt_payload.expires)
        if (Date.now() >= jwt_payload.expires) {
        // We would NEVER enter this if statement despite waiting for longer than 30 seconds 
            done(error, false);
        }
        let user;
        if (isNaN(jwt_payload.sub)) {
            user = await User.findByEmailReg(jwt_payload.sub);
            //console.log("Not a number", user);
        } else {
            user = await User.findById(jwt_payload.sub);
        }
        
        if (user.length > 0) {
            const serializedUser = createUserPayload(user[0])
            done(null, serializedUser);
        //console.log("serialize", user)
        } else {
            done(null, false);
        }
    } catch (error) {
        // console.log(error)
        done(error);
    }
})

passport.use(strategy);