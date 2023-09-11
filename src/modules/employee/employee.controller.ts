import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common'
import { EmployeeService } from 'crud-project-models/dist/services'
import { Employee } from 'crud-project-models/dist/entities'

@Controller('employee')
export class EmployeeController {
	constructor(
		@Inject('EmployeeService')
		private readonly employeeService: EmployeeService
	) {}

	@Get()
	async getAll() {
		return await this.employeeService.findAll()
	}

	@Post()
	async create(@Body() employee: Employee) {
		return await this.employeeService.create(employee)
	}

	@Get(':id')
	async getOne(@Param('id') id: string) {
		return await this.employeeService.findOne(id)
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() body: Partial<Employee>) {
		return await this.employeeService.update({ ...body, id })
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: string) {
		await this.employeeService.delete(id)
	}
}
