import {
    Strategy as JWTStrategy,
    ExtractJwt,
  } from 'passport-jwt';
import {fetchUserById} from '../repository/user-repository.js';


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_HASH_KEY || "myKeyVishalRegmi";



export default function(passport){
    console.log('Verifying Token')
    passport.use(
        new JWTStrategy(opts,function(jwt_payload,done){
            console.log('JWT PAYLOAD',jwt_payload);
            fetchUserById(jwt_payload.sub)
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