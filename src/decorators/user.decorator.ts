import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type MockedUser = {
	name: string;
};

export const LoggedUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		// Do magic with request.
		// const request = ctx.switchToHttp().getRequest();
		return { name: 'John Doe' };
	},
);
