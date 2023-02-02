export class PaymentMethod{
  type: string;
  card_no: string;
  id: number | null;

  constructor(id: number | null, type: string, card_no: string) {
    this.type = type;
    this.card_no = card_no;
    this.id = id;
  }
}
