interface VerificationRequestMailData {
  email: string;
  token: string;
}
export function sendVerificationRequest(data: VerificationRequestMailData) {
  console.log("Sending verificationRequest mail to", data.email);
  console.log("token is", data.token);
}
