import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common'
import { DepartmentService } from 'crud-project-models/dist/services'
import { Department } from 'crud-project-models/dist/entities'

@Controller('department')
export class DepartmentController {
  constructor(
    @Inject('DepartmentService')
    private readonly departmentService: DepartmentService
  ) {}

	@Get()
	async getAll() {
	  return await this.departmentService.findAll()
	}

	@Post()
	async create(@Body() department: Department) {
	  return await this.departmentService.create(department)
	}

	@Get(':id')
	async getOne(@Param('id') id: string) {
	  return await this.departmentService.findOne(id)
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() body: Partial<Department>) {
	  return await this.departmentService.update({ ...body, id })
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: string) {
	  await this.departmentService.delete(id)
	}
}
