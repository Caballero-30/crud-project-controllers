import { Module } from '@nestjs/common'
import { DepartmentController } from './department.controller'
import { DepartmentService } from 'crud-project-models'
import { Department } from 'crud-project-models'
import { dataSource as appDataSource, Repository } from 'crud-project-models'

@Module({
  controllers: [DepartmentController],
  providers: [
    {
      provide: 'DepartmentService',
      useFactory: (departmentRepository: Repository<Department>) => {
        return new DepartmentService(departmentRepository)
      },
      inject: ['DepartmentRepository']
    },
    {
      provide: 'DepartmentRepository',
      useFactory: (dataSource: typeof appDataSource) => {
        return dataSource.getRepository(Department)
      },
      inject: ['dataSource']
    },
    {
      provide: 'dataSource',
      useFactory: () => appDataSource
    }
  ]
})
export class DepartmentModule {}
