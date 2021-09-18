import googleOAuth from 'passport-google-oauth';
import {UserModel} from '../Database/allModel'

const googleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new googleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback"
        },
        //after authenticating with google
        async (accessToken,refreshToken, profile, done) => {
            //creating new user obj
            const newUser =
            {
                fullName: profile.displayName,
                email: profile.emails[0].value,
                profilePic: profile.photos[0].value
            };

            try{

            }
            catch(error)
            {
                done()
            }

        }
        )
    )
}