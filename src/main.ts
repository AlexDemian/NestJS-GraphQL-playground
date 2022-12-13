import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './services/logger.service';
import { killPortProcess } from 'kill-port-process';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true,
		logger: new LoggerService(),
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.useStaticAssets(join(__dirname, '..', 'uploads'));
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');

	const listen = () =>
		app
			.listen(process.env.PORT)
			.then(() =>
				console.log('App is running: http://localhost:' + process.env.PORT),
			);

	listen().catch(async (err) => {
		if (err.code != 'EADDRINUSE') throw err;
		console.log('Hah, it seems we got zombies... Lets destroy them!');
		await killPortProcess(process.env.PORT);
		setTimeout(listen, 1000);
	});
}

bootstrap();
