import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initialiseDataSource } from 'crud-project-models'

async function connect() {
  try {
    const dataSource = await initialiseDataSource({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development'
    })

    console.info(`Database '${dataSource.driver.database}' connected`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(3000)
}

connect()
bootstrap()
