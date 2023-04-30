interface VerificationRequestMailData {
  email: string;
  token: string;
}
export function sendVerificationRequest(data: VerificationRequestMailData) {
  console.log("Sending verificationRequest mail to", data.email);
  console.log("token is", data.token);
}

interface VerificationOnSuccessful {
  email: string;
}
export function notifyUserOnVerificationSuccessful(
  data: VerificationOnSuccessful
) {
  console.log("Sending notifyUserOnVerificationSuccessful mail to", data.email);
}
