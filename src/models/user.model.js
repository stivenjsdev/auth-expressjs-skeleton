import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const saltRounds = 10

// USER SCHEMA
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// https://github.com/kelektiv/node.bcrypt.js#usage
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt); // retorna el password hasheado
  // note: tambien se puede hacer de la sig forma:
  // return await bcrypt.hash(myPlaintextPassword, saltRounds);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); // retorna true o false
}

// USER MODEL
export const User = model(
  "User",
  userSchema
); /* El nombre debe ser siempre en singular */
