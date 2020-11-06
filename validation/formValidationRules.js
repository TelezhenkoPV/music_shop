const FormValidator = require("./FormValidator");
const moment = require("moment");

// Rules for all form fields for validation
const formValidationRules = [
  {
    field: "firstName",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Имя обязательно для заполнения."
  },
  {
    field: "firstName",
    method: "matches",
    validWhen: true,
    args: [/^[a-zA-Zа-яА-ЯёiїєЁІЇЄ']+$/],
    message: "Разрешенные символы: a-zA-Zа-яА-ЯёiїєЁІЇЄ'."
  },
  {
    field: "firstName",
    method: "isLength",
    validWhen: true,
    args: [{ min: 2, max: 25 }],
    message: "Длина имени должна быть от 2 до 25 символов."
  },
  {
    field: "lastName",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Фамилия обязательна для заполнения."
  },
  {
    field: "lastName",
    method: "matches",
    validWhen: true,
    args: [/^[a-zA-Zа-яА-ЯёiїєЁІЇЄ']+$/],
    message: "Разрешенные символы: a-zA-Zа-яА-ЯёiїєЁІЇЄ'."
  },
  {
    field: "lastName",
    method: "isLength",
    validWhen: true,
    args: [{ min: 2, max: 25 }],
    message: "Длина фамилии должна быть от 2 до 25 символов"
  },
  {
    field: "email",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Email обязательный для заполнения."
  },
  {
    field: "email",
    method: "isEmail",
    validWhen: true,
    message: "Адрес электронной почты введен некорректно."
  },
  {
    field: "login",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Логин обязательный для заполнения."
  },
  {
    field: "login",
    method: "matches",
    validWhen: true,
    args: [/^[a-zA-Z0-9]+$/],
    message: "Разрешенные символы: a-z, A-Z, 0-9."
  },
  {
    field: "login",
    method: "isLength",
    validWhen: true,
    args: [{ min: 3, max: 10 }],
    message: "Длина логина должна быть от 3 до 10 символов"
  },
  {
    field: "loginOrEmail",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Это поле обязательно для заполнения."
  },
  {
    field: "password",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Пароль обязательный для заполнения."
  },
  {
    field: "password",
    method: "matches",
    validWhen: true,
    args: [/^[a-zA-Z0-9]+$/],
    message: "Разрешенные символы: a-z, A-Z, 0-9."
  },
  {
    field: "password",
    method: "isLength",
    validWhen: true,
    args: [{ min: 7, max: 30 }],
    message: "Длина пароля должна быть от 7 до 30 символов."
  },
  {
    field: "newPassword",
    method: FormValidator.isEmpty,
    validWhen: false,
    message: "Необходимо указать новый пароль."
  },
  {
    field: "newPassword",
    method: "matches",
    validWhen: true,
    args: [/^[a-zA-Z0-9]+$/],
    message: "Разрешенные символы: a-z, A-Z, 0-9."
  },
  {
    field: "newPassword",
    method: "isLength",
    validWhen: true,
    args: [{ min: 7, max: 30 }],
    message: "Длина пароля должна быть от 7 до 30 символов."
  },
  {
    field: "telephone",
    method: "matches",
    args: [/^\+380\d{3}\d{2}\d{2}\d{2}$/],
    validWhen: true,
    message: "Используйте формат +380XXXXXXXXX."
  },
  {
    field: "isAdmin",
    method: "isBoolean",
    validWhen: true,
    message: "isAdmin может быть true или false"
  },
  {
    field: "enabled",
    method: "isBoolean",
    validWhen: true,
    message: "isBoolean может быть true или false"
  },
  {
    field: "letterSubject",
    method: FormValidator.isEmpty,
    validWhen: false,
    message:
      "Эта операция инициирует отправку писма клиенту. Необходимо заполнить поле 'letterSubject'."
  },
  {
    field: "letterHtml",
    method: FormValidator.isEmpty,
    validWhen: false,
    message:
      "Эта операция инициирует отправку писма клиенту. Необходимо заполнить поле 'letterHtml'."
  }
];

module.exports = formValidationRules;
