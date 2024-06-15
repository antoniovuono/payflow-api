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
      wasPaid: data.wasPaid ?? false,
      created_at: new Date(),
    }

    this.bills.push(bill)

    return bill
  }

  async findByBillCode(billCode: string) {
    const bill = this.bills.find((bill) => bill.bill_code === billCode)

    if (!bill) return null

    return bill
  }

  async findMany(userId: string) {
    const bills = this.bills.filter((bill) => bill.user_id === userId)

    return bills
  }

  async filterByPaidStatus(userId: string, paid: boolean) {
    const bills = this.bills.filter(
      (bill) => bill.user_id === userId && bill.wasPaid === paid,
    )

    return bills
  }
}
