import {
	Body,
	CacheInterceptor,
	CacheKey,
	CacheTTL,
	CACHE_MANAGER,
	CacheStore,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Param,
	Post,
	UseInterceptors,
	Logger,
} from '@nestjs/common';
import { LoggedUser, MockedUser } from 'src/decorators/user.decorator';

import { CreatePostInput, PostEntity } from './posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(CacheInterceptor)
export class PostsController {
	private readonly logger = new Logger(PostsController.name);

	constructor(
		private readonly postService: PostsService,
		@Inject(CACHE_MANAGER) private cacheManager: CacheStore,
	) {}

	@Get(`:id`)
	async get(@Param('id') id: number) {
		const post = await this.postService.findOne(id);
		if (!post) {
			throw new NotFoundException('Post not found');
		}
		return post;
	}

	@Get()
	@CacheKey('posts')
	@CacheTTL(1800)
	async getAll() {
		return this.postService.findAll();
	}

	@Post()
	async create(
		@LoggedUser() user: MockedUser,
		@Body() data: CreatePostInput,
	): Promise<PostEntity> {
		const newPost = await this.postService.create(data);
		await this.cacheManager.del('posts');
		this.logger.log(`${user.name} created new post!`);
		return newPost;
	}
}
