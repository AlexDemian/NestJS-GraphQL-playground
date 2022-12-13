import {
	Field,
	GraphQLISODateTime,
	InputType,
	Int,
	ObjectType,
} from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class PostEntity {
	@Field(() => Int)
	id: number;

	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Field(() => String)
	body: string;

	@Expose()
	@Field(() => String)
	get title(): string {
		return `Post ${this.id} created at ${this.createdAt}`;
	}

	@Field(() => String)
	@Expose()
	get serializedAt(): string {
		return new Date().toLocaleTimeString();
	}

	constructor(partial: Partial<PostEntity>) {
		Object.assign(this, partial);
	}
}

@InputType()
export class CreatePostInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	body: string;
}
