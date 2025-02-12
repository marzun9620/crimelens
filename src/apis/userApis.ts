import Axios from "./axios";
import Cookies from "js-cookie";

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  profile_image: string;
};

const createUser = async (userInfo: FormDataType) => {
  try {
    const response = await Axios.post("/user/register", userInfo);

    switch (response.status) {
      case 201:
        return response.data;
      default:
        throw new Error("Something went wrong");
    }
  } catch (error: any) {
    switch (error.response.status) {
      case 409:
        throw new Error("User already exists");
      default:
        throw new Error(error.message);
    }
  }
};

const verifyUser = async (email: string, otp: string) => {
  try {
    const response = await Axios.post("/user/verify-email", { email, otp });

    switch (response.status) {
      case 200:
        return response.data;

      default:
        throw new Error("Something went wrong");
    }
  } catch (error: any) {
    switch (error.response.status) {
      case 400:
        throw new Error("Invalid OTP");
      case 404:
        throw new Error("User not found");
      case 401:
        throw new Error("OTP expired");
      default:
        throw new Error(error.message);
    }
  }
};

const resendOtp = async (email: string) => {
  try {
    const response = await Axios.post("/user/resend-otp", { email });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("Something went wrong");
    }
  } catch (error: any) {
    switch (error.response.status) {
      case 404:
        throw new Error("User not found");
      case 400:
        throw new Error("User already verified");
      default:
        throw new Error(error.message);
    }
  }
};

type LoginDataType = {
  email: string;
  password: string;
};

const loginUser = async (formData: LoginDataType) => {
  try {
    const response = await Axios.post("/user/login", formData);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("Something went wrong");
    }
  } catch (error: any) {
    switch (error.response.status) {
      case 400:
        throw new Error("Bad request");
      case 401:
        throw new Error("Invalid credentials");
      case 404:
        throw new Error("User not found");
      default:
        throw new Error(error.message);
    }
  }
};

const refreshToken = async () => {
  try {
    const response = await Axios.post("/user/token/refresh", {
      refreshToken: Cookies.get("refreshToken"),
    });

    switch (response.status) {
      case 200:
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data;
      default:
        throw new Error("Something went wrong");
    }
  } catch (error: any) {
    switch (error.response.status) {
      case 400:
        throw new Error("Bad request");
      case 401:
        throw new Error("Invalid credentials");
      case 404:
        throw new Error("User not found");
      default:
        throw new Error(error.message);
    }
  }
};

const logOut = () => {
  localStorage.removeItem("accessToken");
  Cookies.remove("refreshToken");
};

export { createUser, verifyUser, resendOtp, loginUser, refreshToken, logOut };
