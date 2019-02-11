export class UserModel {
  constructor(
      public id?: number,
      public firstName?: string,
      public lastName?: string,
      public role?:  string,
      public email?: string,
      public password?: string,
      public GroupId?: number,
      public lastLogin?: number
  ) {
  }
}
