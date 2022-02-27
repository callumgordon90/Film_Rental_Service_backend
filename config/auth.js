module.exports = {
    secret: process.env.AUTH_SECRET || "zA23RtfLoPP", //the encryption key
    expires: process.env.AUTH_EXPIRES || "24h", //duration of the token
    rounds: process.env.AUTH_ROUNDS || 10 //number of times that the password is encrypted
}