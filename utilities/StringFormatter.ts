export const capitalizeFirstLetter = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const simplifyFirebaseAuthError = (error: string) => {
  switch (error) {
    case "Firebase: Error (auth/email-already-in-use).":
      return "Email already in use";
    case "Firebase: Error (auth/user-not-found).":
      return "User not found";
    case "Firebase: Error (auth/wrong-password).":
      return "Wrong password";
    case "Firebase: Error (auth/weak-password).":
      return "Weak password";
    case "Firebase: Error (auth/invalid-email).":
      return "Invalid email";
    case "Firebase: Error (auth/user-disabled).":
      return "User disabled";
    case "Firebase: Error (auth/operation-not-allowed).":
      return "Operation not allowed";
    default:
      return error;
  }
};

// if string is longer than 20 characters, truncate it and add ellipsis
export const truncateString = (s: string, length: number) => {
  if (s.length > length) {
    return s.substring(0, length) + "...";
  } else {
    return s;
  }
};
