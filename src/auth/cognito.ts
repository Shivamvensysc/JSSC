// import {
//   CognitoUserPool,
//   CognitoUser,
//   CognitoUserAttribute,
// } from "amazon-cognito-identity-js";

// import type { ISignUpResult } from "amazon-cognito-identity-js";

// // ======================
// // CONFIG
// // ======================

// const poolData = {
//   UserPoolId: "ap-south-1_ta89ivYut",
//   ClientId: "4d7mif0h3qqgqs8l1drq8gg32m",
// };

// export const userPool = new CognitoUserPool(poolData);

// // ======================
// // TYPES
// // ======================

// export interface CognitoResponse {
//   message?: string;
//   result?: unknown;
// }

// export interface SendOtpResponse {
//   userSub: string;
//   username: string;
//   codeDeliveryDetails?: unknown;
//   rawResult: ISignUpResult;
// }

// export interface VerifyOtpResponse {
//   status: string;
//   message: string;
// }

// // ======================
// // SEND OTP / SIGN UP
// // ======================

// export const sendOtp = async (
//   email: string
// ): Promise<SendOtpResponse> => {
//   return new Promise((resolve, reject) => {
//     const attributeList: CognitoUserAttribute[] = [];

//     const emailAttribute = new CognitoUserAttribute({
//       Name: "email",
//       Value: email,
//     });

//     attributeList.push(emailAttribute);

//     userPool.signUp(
//       email,
//       "Temp@123456Aa",
//       attributeList,
//       [],
//       (err, result) => {
//         if (err) {
//           reject(err);
//           return;
//         }

//         if (!result) {
//           reject(new Error("Signup failed"));
//           return;
//         }

//         console.log("Signup Result:", result);
//         console.log("Cognito User Sub:", result.userSub);

//         resolve({
//           userSub: result.userSub,
//           username: result.user?.getUsername?.() || email,
//           codeDeliveryDetails: result.codeDeliveryDetails,
//           rawResult: result,
//         });
//       }
//     );
//   });
// };

// // ======================
// // VERIFY OTP / CONFIRM SIGN UP
// // ======================

// export const verifyOtp = async (
//   email: string,
//   otp: string
// ): Promise<VerifyOtpResponse> => {
//   return new Promise((resolve, reject) => {
//     const cognitoUser = new CognitoUser({
//       Username: email,
//       Pool: userPool,
//     });

//     cognitoUser.confirmRegistration(
//       otp,
//       true,
//       (err, result) => {
//         if (err) {
//           reject(err);
//           return;
//         }

//         console.log("Confirm Registration Result:", result);

//         resolve({
//           status: result || "SUCCESS",
//           message: "Email verified successfully",
//         });
//       }
//     );
//   });
// };

// // ======================
// // RESEND OTP
// // ======================

// export const resendOtp = async (
//   email: string
// ): Promise<unknown> => {
//   return new Promise((resolve, reject) => {
//     const cognitoUser = new CognitoUser({
//       Username: email,
//       Pool: userPool,
//     });

//     cognitoUser.resendConfirmationCode((err, result) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       console.log("Resend OTP Result:", result);
//       resolve(result);
//     });
//   });
// };

//new way to do 
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

import type { ISignUpResult } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-south-1_ta89ivYut",
  ClientId: "4d7mif0h3qqgqs8l1drq8gg32m",
};

export const userPool = new CognitoUserPool(poolData);

export interface SendOtpResponse {
  userSub: string;
  username: string;
  codeDeliveryDetails?: unknown;
  rawResult: ISignUpResult;
}

export interface VerifyOtpResponse {
  status: string;
  message: string;
}

export const sendOtp = async (
  email: string,
  password: string
): Promise<SendOtpResponse> => {
  return new Promise((resolve, reject) => {
    const attributeList: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    userPool.signUp(
      email,
      password,
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

        resolve({
          userSub: result.userSub,
          username: result.user?.getUsername?.() || email,
          codeDeliveryDetails: result.codeDeliveryDetails,
          rawResult: result,
        });
      }
    );
  });
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<VerifyOtpResponse> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        status: result || "SUCCESS",
        message: "Email verified successfully",
      });
    });
  });
};

export const resendOtp = async (email: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};