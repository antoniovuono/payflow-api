import { Bill, Prisma } from '@prisma/client'
import { BillRepository } from '../bill-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryBillsRepository implements BillRepository {
  public bills: Bill[] = []

  async create(data: Prisma.BillUncheckedCreateInput) {
    const bill = {
      id: randomUUID(),
      name: data.name,
      due_date: new Date(data.due_date),
      amount: data.amount,
      bill_code: data.bill_code,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.bills.push(bill)

    return bill
  }
}
