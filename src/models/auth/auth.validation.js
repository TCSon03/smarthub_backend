import Joi from "joi";

export const registerValidation = Joi.object({
  userName: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Tên người dùng không được để trống.",
    "string.min": "Tên người dùng phải có ít nhất {#limit} ký tự.",
    "string.max": "Tên người dùng không được vượt quá {#limit} ký tự.",
    "any.required": "Tên người dùng là bắt buộc.",
  }),

  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "vn", "org"] },
    })
    .required()
    .messages({
      "string.empty": "Email không được để trống.",
      "string.email":
        "Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: example@domain.com).",
      "any.required": "Email là bắt buộc.",
    }),

  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.empty": "Mật khẩu không được để trống.",
      "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
      "string.pattern.base":
        "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
      "any.required": "Mật khẩu là bắt buộc.",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Xác nhận mật khẩu không khớp với mật khẩu đã nhập.",
    "string.empty": "Xác nhận mật khẩu không được để trống.",
    "any.required": "Xác nhận mật khẩu là bắt buộc.",
  }),
});
