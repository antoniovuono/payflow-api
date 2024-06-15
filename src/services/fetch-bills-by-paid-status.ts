import { BillRepository } from '@/repositories/bill-repository'
import { Bill } from '@prisma/client'

interface FetchBillsByPaidStatusServiceRequest {
  userId: string
  paid: boolean
}

interface FetchBillsByPaidStatusServiceResponse {
  bills: Bill[]
}

export class FetchBillsByPaidStatusService {
  constructor(private readonly billsRepository: BillRepository) {}

  async execute({
    userId,
    paid,
  }: FetchBillsByPaidStatusServiceRequest): Promise<FetchBillsByPaidStatusServiceResponse> {
    const bills = await this.billsRepository.filterByPaidStatus(userId, paid)

    return { bills }
  }
}
