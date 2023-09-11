import { Module } from '@nestjs/common'
import { EmployeeController } from './employee.controller'
import { Employee, Repository } from 'crud-project-models'
import { EmployeeService } from 'crud-project-models'
import { dataSource as appDataSource } from 'crud-project-models'

@Module({
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EmployeeService',
      useFactory: (employeeRepository: Repository<Employee>) => {
        return new EmployeeService(employeeRepository)
      },
      inject: ['EmployeeRepository']
    },
    {
      provide: 'EmployeeRepository',
      useFactory: (dataSource: typeof appDataSource) => {
        return dataSource.getRepository(Employee)
      },
      inject: ['dataSource']
    },
    {
      provide: 'dataSource',
      useFactory: () => appDataSource
    }
  ]
})
export class EmployeeModule {}
