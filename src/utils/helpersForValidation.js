const MESSEGES = {
  PASSWORD:
    "password must contain at least 1 uppercase letter, 1 lowercase letter, 4 digits and 1 of the following special characters: #?!@$%^&*-\\",
  EMAIL: "use proper email format. for example: EXAMPLE@EMAIL.COM",
  COLOR: "use # and afterwards 3 or 6 hexadecimal digits",
};

const REGEXES = {
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[@#$%^&*!_-])[A-Za-z\d@#$%^&*!_-]{8,}$/,
};
export { MESSEGES, REGEXES };
