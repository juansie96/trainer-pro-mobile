export function mapFirebaseErrorCodeToMsg(errorCode: string): string {
  switch (errorCode) {
    case "auth/wrong-password":
      return "La contreña es incorrecta";
    case "auth/user-not-found":
      return "El email ingresado no está registrado en el sistema";
    default:
      return "Ocurrió un error inesperado, por favor intente nuevamente";
  }
}

export const extractVideoID = (videoUrl: string) => {
  if (videoUrl.includes("v=")) {
    const videoId = videoUrl.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    return ampersandPosition !== -1
      ? videoId.substring(0, ampersandPosition)
      : videoId;
  } else {
    return "";
  }
};
