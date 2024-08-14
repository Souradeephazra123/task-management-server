import AuthDataBase from "../model/auth.mongo.js";

const DEFAULT_USER_ID = 100;

async function LatestUser() {
  const latestUser = await AuthDataBase.findOne().sort("-userid");
  if (latestUser) {
    return latestUser.userid;
  } else {
    return DEFAULT_USER_ID;
  }
}

async function findUserById(userId) {
  try {
    const user = await AuthDataBase.findOne({ userId: userId });
    return user;
  } catch (error) {
    console.log("Error in finding user", error.message);
  }
}

async function findEmail(email) {
  try {
    const existEmail = await AuthDataBase.findOne({ email: email });
    return existEmail;
  } catch (error) {
    console.log("Error in finding email", error);
  }
}

async function saveUser(email, hashedPassword) {
  try {
    const newUser = new AuthDataBase({
      userid: (await LatestUser()) + 1,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
  } catch (error) {
    console.log("Error in saving user", error);
  }
}

export { findEmail, saveUser,findUserById };
