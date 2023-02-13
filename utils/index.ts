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
