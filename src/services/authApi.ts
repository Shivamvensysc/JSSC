import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CaptchaResponse {
  success: boolean;
  message: string;
  captchaId: string;
  captchaSvg: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  mobileNumber: string;
  captchaId: string;
  captchaText: string;
}

export const getCaptcha = async (): Promise<CaptchaResponse> => {
  const response = await axios.get(
    `${API_BASE_URL}/auth/captcha`
  );

  return response.data;
};

export const registerCandidate = async (
  payload: RegisterPayload
) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/register`,
    payload
  );

  return response.data;
};