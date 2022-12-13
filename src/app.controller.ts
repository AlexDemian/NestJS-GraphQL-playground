import {
	Get,
	Controller,
	Render,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
	@Get()
	@Render('index')
	root() {
		null;
	}

	@Post('/upload')
	@UseInterceptors(FileInterceptor('file'))
	@Render('index')
	uploadFile(@UploadedFile('file') file: Express.Multer.File) {
		const { buffer, originalname: fname } = file;
		const fpath = join('uploads', fname);
		writeFileSync(fpath, buffer);
		return {
			message: `File uploaded: ${fname}`,
			src: fname,
		};
	}
}
