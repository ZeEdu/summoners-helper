export class HandleErrors {
   public static loginErrors(errorCode: string): string {
      switch (errorCode) {
         case 'auth/invalid-email':
            return 'Invalid Email';
            break;
         case 'auth/user-disabled':
            return 'User disabled';
            break;
         case 'auth/user-not-found':
            return 'User not found';
            break;
         case 'auth/wrong-password':
            return 'Invalid password';
            break;
         default:
            return 'Something went wrong! Please try again later';
            break;
      }
      return errorCode;
   }
}
