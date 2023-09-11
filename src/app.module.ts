import { Module } from '@nestjs/common'
import { DepartmentModule } from './modules/department/department.module'
import { EmployeeModule } from './modules/employee/employee.module'

@Module({
  imports: [DepartmentModule, EmployeeModule]
})
export class AppModule {}
