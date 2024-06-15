import { BillRepository } from '@/repositories/bill-repository'
import { Bill } from '@prisma/client'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists'

interface CreateBillServiceRequest {
  name: string
  dueDate: Date
  amount: number
  billCode: string
  userId: string
}

interface CreateBillServiceResponse {
  bill: Bill
}

export class CreateBillService {
  constructor(private billRepository: BillRepository) {}

  async execute({
    name,
    dueDate,
    amount,
    billCode,
    userId,
  }: CreateBillServiceRequest): Promise<CreateBillServiceResponse> {
    const billAlreadyExist = await this.billRepository.findByBillCode(billCode)

    if (billAlreadyExist) throw new ResourceAlreadyExistsError()

    const bill = await this.billRepository.create({
      name,
      due_date: dueDate,
      amount,
      bill_code: billCode,
      user_id: userId,
    })

    return { bill }
  }
}
