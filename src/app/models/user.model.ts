export class UserModel {
  constructor(
      public id?: number,
      public firstName?: string,
      public lastName?: string,
      public role?:  string,
      public email?: string,
      public passwordHash?: string,
      public lastLogin?: number
  ) {
  }
}
