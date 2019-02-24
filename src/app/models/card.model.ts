export class CardModel {
  constructor(
      public id?: number,
      public question?: string,
      public answer?: string,
      public difficulty?:  number,
      public type?: string,
      public deckId?: number
  ) {
  }
}
