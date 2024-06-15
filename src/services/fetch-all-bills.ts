import { BillRepository } from '@/repositories/bill-repository'
import { Bill } from '@prisma/client'

interface FetchManyBillsServiceRequest {
  userId: string
}

interface FetchManyBillsServiceResponse {
  bills: Bill[]
}

export class FetchManyBillsService {
  constructor(private billRepository: BillRepository) {}

  async execute({
    userId,
  }: FetchManyBillsServiceRequest): Promise<FetchManyBillsServiceResponse> {
    const bills = await this.billRepository.findMany(userId)

    return { bills }
  }
}
