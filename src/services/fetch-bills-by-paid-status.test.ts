import { InMemoryBillsRepository } from '@/repositories/in-memory/in-memory-bills-repository'
import { FetchBillsByPaidStatusService } from './fetch-bills-by-paid-status'

let billsRepository: InMemoryBillsRepository
let fetchBillsByPaidService: FetchBillsByPaidStatusService

describe('Fetch Bills By Paid Status Service', () => {
  beforeEach(() => {
    billsRepository = new InMemoryBillsRepository()
    fetchBillsByPaidService = new FetchBillsByPaidStatusService(billsRepository)
  })

  it('should be able to fetch all paid bills', async () => {
    billsRepository.create({
      amount: 100,
      bill_code: '1231312',
      due_date: new Date(),
      name: 'Test Bill',
      user_id: 'user_id',
    })

    for (let i = 0; i <= 3; i++) {
      billsRepository.create({
        amount: 100,
        bill_code: `${i}`,
        due_date: new Date(),
        name: 'Test Bill',
        user_id: 'user_id',
        wasPaid: true,
      })
    }

    const { bills } = await fetchBillsByPaidService.execute({
      userId: 'user_id',
      paid: true,
    })

    expect(bills).toHaveLength(4)
  })

  it('should be able to fetch all unpaid bills', async () => {
    billsRepository.create({
      amount: 100,
      bill_code: '1231312',
      due_date: new Date(),
      name: 'Test Bill',
      user_id: 'user_id',
    })

    for (let i = 0; i <= 3; i++) {
      billsRepository.create({
        amount: 100,
        bill_code: `${i}`,
        due_date: new Date(),
        name: 'Test Bill',
        user_id: 'user_id',
        wasPaid: true,
      })
    }

    const { bills } = await fetchBillsByPaidService.execute({
      userId: 'user_id',
      paid: false,
    })

    expect(bills).toHaveLength(1)
  })
})
