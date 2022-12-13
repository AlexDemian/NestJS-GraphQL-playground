import { CacheModule, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from '../../services/prisma.service';
import { PostsResolver } from './posts.resolver';

@Module({
	imports: [CacheModule.register()],
	controllers: [PostsController],
	providers: [PostsService, PrismaService, PostsResolver],
})
export class PostModule {}
