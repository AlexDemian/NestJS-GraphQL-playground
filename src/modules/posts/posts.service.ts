import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreatePostInput, PostEntity } from './posts.dto';

@Injectable()
export class PostsService {
	constructor(private prisma: PrismaService) {}

	async findOne(id: number) {
		const post = await this.prisma.post.findUnique({ where: { id } });
		return new PostEntity(post);
	}

	async findAll() {
		const posts = await this.prisma.post.findMany();
		return posts.map((post) => new PostEntity(post));
	}

	async create(data: CreatePostInput) {
		const post = await this.prisma.post.create({ data });
		return new PostEntity(post);
	}
}
