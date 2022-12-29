// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const {findUserById} = require('./repository/user-respository');
import {JwtStrategy,ExtractJwt} from 'passport-jwt';
import {findUserById} from '../repository/user-repository';


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_HASH_KEY;



export default function(passport){
    console.log('Verifying Token')
    passport.use(
        new JwtStrategy(opts,function(jwt_payload,done){
            console.log('JWT PAYLOAD',jwt_payload);
            findUserById(jwt_payload.sub)
                .then((user)=> {
                    if(user) return done(null,user);
                    else return done(null,false);
                })
                .catch((error)=> {
                    console.log('Catch Error',error);
                    return done(error,false);
                })
            
        })
    );
};