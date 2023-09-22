import { User } from "../models/user.model.js";
import { generateToken } from "../utils/tokens.js";

export const signUp = async (req, res) => {
  const { email, name, password } = req.body;

  const user = await User.findOne({ email });

  // validar si ya hay un usuario registrado con ese email
  if (user) {
    return res.status(401).json({ error: "email already exists" });
  }

  const newUser = new User({ email, name, password });

  // encriptar el password
  newUser.password = await newUser.encryptPassword(password);

  // guardar el usuario
  await newUser.save();

  // generar el JWT
  const token = generateToken(newUser);

  res.status(200).json({ ok: true, token });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // validar si no existe un usuario registrado con ese email
  if (!user) {
    return res.status(404).json({ error: "email does not exist" });
  }

  const validPassword = await user.validatePassword(password);

  // validar si el password no es valido
  if (!validPassword) {
    return res.status(401).json({
      ok: false,
      error: "Incorrect Password",
    });
  }

  // generar el JWT
  const token = generateToken(user);

  res.status(200).json({ ok: true, token });
};
