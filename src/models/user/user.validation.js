import Joi from "joi";

const userValidation = Joi.object({
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

  phone: Joi.string()
    .trim()
    .pattern(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/)
    .allow("")
    .messages({
      "string.pattern.base":
        "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: 0912345678 hoặc +84912345678).",
    }),

  address: Joi.object({
    street: Joi.string()
      .trim()
      .allow("")
      .messages({ "string.empty": "Tên đường không được để trống." }),
    ward: Joi.string()
      .trim()
      .allow("")
      .messages({ "string.empty": "Phường/Xã không được để trống." }),
    district: Joi.string()
      .trim()
      .allow("")
      .messages({ "string.empty": "Quận/Huyện không được để trống." }),
    city: Joi.string()
      .trim()
      .allow("")
      .messages({ "string.empty": "Tỉnh/Thành phố không được để trống." }),
  }).messages({
    "object.base": "Địa chỉ không hợp lệ.",
  }),

  avatar: Joi.string().uri().allow("").messages({
    "string.uri": "URL ảnh đại diện không hợp lệ.",
  }),

  birthDay: Joi.date().iso().max("now").allow(null).messages({
    "date.base": "Ngày sinh không hợp lệ. Vui lòng nhập định dạng YYYY-MM-DD.",
    "date.iso": "Ngày sinh phải ở định dạng ISO 8601 (YYYY-MM-DD).",
    "date.max": "Ngày sinh không được ở tương lai.",
  }),

  role: Joi.string().valid("member", "admin").default("member").messages({
    "any.only": 'Vai trò không hợp lệ. Chỉ chấp nhận "member" hoặc "admin".',
  }),

  isActive: Joi.boolean().default(true),
  isVerified: Joi.boolean().default(false),
  resetPassword: Joi.string().allow(null, "").optional(),
  deleteAt: Joi.date().allow(null).optional(),
});

export default userValidation;
