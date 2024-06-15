import { InMemoryBillsRepository } from '@/repositories/in-memory/in-memory-bills-repository'
import { CreateBillService } from './create-bill'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists'

let billRepository: InMemoryBillsRepository
let createBillService: CreateBillService

describe('Create Bill Service', () => {
  beforeEach(async () => {
    billRepository = new InMemoryBillsRepository()
    createBillService = new CreateBillService(billRepository)
  })

  it('should be able to create a bill', async () => {
    const { bill } = await createBillService.execute({
      name: 'Test Bill',
      amount: 100,
      billCode: '34191.79001 01043.510047 91020.150008 8 97480026001',
      dueDate: new Date(),
      userId: '',
    })

    expect(bill.id).toEqual(expect.any(String))
  })

  it('should not be able to create a bill with the same bill code', async () => {
    billRepository.create({
      name: 'Test Bill',
      amount: 100,
      bill_code: '34191.79001 01043.510047 91020.150008 8 97480026000',
      due_date: new Date(),
      user_id: '',
    })

    await expect(() =>
      createBillService.execute({
        name: 'Test Bill',
        amount: 100,
        billCode: '34191.79001 01043.510047 91020.150008 8 97480026000',
        dueDate: new Date(),
        userId: '',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})