import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../../common/utils/mailer.js";
dotenv.config();

const EMAIL_SECRET = process.env.EMAIL_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, EMAIL_SECRET, {
      expiresIn: "15m",
    });

    const verifyLink = `${CLIENT_URL}/api/auth/verify-email?token=${token}`;
    await sendVerificationEmail(email, verifyLink);

    return res.status(201).json({
      success: true,
      message: "Đăng kí thành công! Vui lòng kiểm tra email để xác thực",
      newUser,
    });
  } catch (error) {
    console.error("Loi dang ki tai khoan: ", error);
  }
};

// xac thuc email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        message: "Thiếu token",
      });
    }
    const decoded = jwt.verify(token, EMAIL_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    }
    if (user.isVerified)
      return res.status(400).json({ message: "Email đã được xác thực" });

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "Xác thực email thành công" });
  } catch (error) {
    return res.status(400).json({
      messange: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};
