import { Bill, Prisma } from '@prisma/client'

export interface BillRepository {
  create(data: Prisma.BillUncheckedCreateInput): Promise<Bill>
}