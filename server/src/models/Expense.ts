import {Schema, model, Document} from 'mongoose';  

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  date?: Date;
}

const expenseSchema = new Schema<IExpense>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });


export default model<IExpense>('Expense', expenseSchema);