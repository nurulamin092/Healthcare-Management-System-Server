import { auth } from "../../lib/auth";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}
interface ILoginUserPayload {
  email: string;
  password: string;
}
const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      //default values
      // needsPasswordChange: false,
      // role: Role.PATIENT
    },
  });
  if (!data.user) {
    throw new Error("Failed to register patient");
  }
  return data;
};

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  if (!data.user) {
    throw new Error("Invalid email or password");
  }
  return data;
};
export const AuthService = {
  registerPatient,
  loginUser,
};
