import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import type {
  ISignUpResult,
} from "amazon-cognito-identity-js";

// ======================
// CONFIG
// ======================

const poolData = {
  UserPoolId: "ap-south-1_ta89ivYut",
  ClientId: "4d7mif0h3qqgqs8l1drq8gg32m",
};

export const userPool = new CognitoUserPool(poolData);

// ======================
// TYPES
// ======================

export interface CognitoResponse {
  message?: string;
  result?: unknown;
}

// ======================
// SEND OTP
// ======================

export const sendOtp = async (
  email: string
): Promise<ISignUpResult> => {
  return new Promise((resolve, reject) => {
    const attributeList: CognitoUserAttribute[] = [];

    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });
    
    attributeList.push(emailAttribute);

    userPool.signUp(
      email,
      "Temp@123456Aa", // Temporary password
      attributeList,
      [],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        if (!result) {
          reject(new Error("Signup failed"));
          return;
        }

        resolve(result);
      }
    );
  });
};

// ======================
// VERIFY OTP
// ======================

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(
      otp,
      true,
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      }
    );
  });
};

// ======================
// RESEND OTP
// ======================

export const resendOtp = async (
  email: string
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode(
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      }
    );
  });
};