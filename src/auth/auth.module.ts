import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { LocalStrategy } from './strategies/loca.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt,
          signOptions: {
            expiresIn: '10d'
          }
        }
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmRlZTI4ZGUwYmY2Y2FmMmU0ZjFhMzQiLCJpYXQiOjE2NTg3NzQ2NDQsImV4cCI6MTY1OTYzODY0NH0.xtUYXf_JUhNRAQtOYi_iy5cwQ8QfGgJVVDOvj8-jMfk
