import { FetchManyBillsService } from './fetch-all-bills'
import { InMemoryBillsRepository } from '@/repositories/in-memory/in-memory-bills-repository'

let billRepository: InMemoryBillsRepository
let fetchManyBillsService: FetchManyBillsService

describe('Fetch all bills Service', () => {
  beforeEach(() => {
    billRepository = new InMemoryBillsRepository()
    fetchManyBillsService = new FetchManyBillsService(billRepository)
  })

  it('should be able to fetch all bills', async () => {
    billRepository.create({
      name: 'Test Bill',
      amount: 100,
      bill_code: '34191.79001 01043.510047 91020.150008 8 97480026001',
      due_date: new Date(),
      user_id: '1',
    })

    const { bills } = await fetchManyBillsService.execute({
      userId: '1',
    })

    expect(bills).toHaveLength(1)
  })
})
