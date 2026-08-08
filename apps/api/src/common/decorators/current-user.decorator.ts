// @CurrentUser() یه Custom Decorator هست.
//
// بدون این decorator، هر بار باید می‌نوشتیم:
//   @Param() / @Body() ... + @Req() req: Request → req.user
//
// با این decorator می‌نویسیم:
//   async getProfile(@CurrentUser() user: User) { ... }
//
// خیلی تمیزتر و خواناتره. این الگو در NestJS خیلی رایجه.

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@repoint/database';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    return request.user;
  },
);
