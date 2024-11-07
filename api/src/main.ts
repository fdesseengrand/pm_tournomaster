import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ['http://localhost:4200', 'http://localhost:80'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    // Swagger.
    const config = new DocumentBuilder()
        .setTitle('Tournomaster API')
        .setDescription('The Tournomaster API description')
        .setVersion('0.1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory, {
        jsonDocumentUrl: 'open-api',
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
