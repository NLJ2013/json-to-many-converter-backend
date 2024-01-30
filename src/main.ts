import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('JSON to Many Converter')
    .setDescription('An Application to convert JSON to many formats')
    .setVersion('1.0')
    .addTag('JSON to Many Converter')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(3000, () => console.log('Server is running on port 3000'));
}
bootstrap();
