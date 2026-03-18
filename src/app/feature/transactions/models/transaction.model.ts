export interface Transaction {
  id: number;
  fundId: number;
  fundName: string;
  type: 'SUBSCRIBE' | 'CANCEL';
  amount: number;
  date: Date;
  notification: 'EMAIL' | 'SMS';
}