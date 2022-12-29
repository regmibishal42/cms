import passport from "passport";

const protectedMiddleware = passport.authenticate('jwt',{session:false});

export {
    protectedMiddleware
}