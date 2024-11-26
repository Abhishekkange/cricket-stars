
function generateOtp() {
    // Generate a random number between 10000 and 99999 (inclusive)
    const random5DigitNumber = Math.floor(10000 + Math.random() * 90000);
    return random5DigitNumber;
}

let OTP = generateOtp();


const otpgeneration = async (req, res, next) => {
    try {

        const mobileNumber = req.body.mobileNumber;
        const existingUser = await user.findOne({ mobileNumber });

        if (existingUser) {
            return res.send("The user already exists! Please sign in to continue.");
        }

    } catch (error) {
        console.error(error);
    }
};

module.exports = { OTP, otpgeneration };

