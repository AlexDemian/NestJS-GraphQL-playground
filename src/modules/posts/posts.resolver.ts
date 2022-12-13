import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreatePostInput, PostEntity } from './posts.dto';
import { PostsService } from './posts.service';

@Resolver(() => PostEntity)
export class PostsResolver {
	constructor(private readonly postsService: PostsService) {}

	@Mutation(() => PostEntity)
	createPosts(@Args('input') input: CreatePostInput) {
		return this.postsService.create(input);
	}

	@Query(() => [PostEntity], { name: 'posts' })
	findAll() {
		return this.postsService.findAll();
	}

	@Query(() => PostEntity, { name: 'post' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.postsService.findOne(id);
	}
}
