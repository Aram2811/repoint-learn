import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    // JwtModule رو بدون secret ثبت می‌کنیم
    // چون در AuthService هر بار sign می‌کنیم، secret رو خودمون می‌دیم
    // (این انعطاف بیشتری برای Access/Refresh token با secret های مختلف می‌ده)
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
