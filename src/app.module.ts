import { Module } from '@nestjs/common';
import { PostModule } from './modules/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
	imports: [
		PostModule,
		ConfigModule.forRoot(),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'schema-generated.gql',
		}),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
