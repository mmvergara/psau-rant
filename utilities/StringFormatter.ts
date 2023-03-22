export const capitalizeFirstLetter = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const formatFirebaseAuthError = (s: string) =>
  capitalizeFirstLetter(s.split("/")[1].replace(/-/g, " "));
