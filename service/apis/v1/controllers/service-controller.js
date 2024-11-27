const {OTP,generateOtp} = require('../middlewares/sendotp')


async function verifyOtp(req,res)
{
    const { email, otp } = req.body;

    if (otp === OTP) {
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

}

async function forgetpasswordotp(req,res)
{
    const { otp } = req.body;

  if (otp === OTP) {
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
}

module.exports = {verifyOtp,forgetpasswordotp}
