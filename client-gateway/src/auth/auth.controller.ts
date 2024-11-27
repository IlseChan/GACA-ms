import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE, NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Auth, Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy,) {}

  @Post()
  createLenguaje(@Body() registerUserDto:RegisterUserDto){
    return this.client.send(
      'auth.register.user',
      registerUserDto,
    );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Auth(ValidRoles.admin)
  @Get('verify')
  verifyToken( @User() user: CurrentUser, @Token() token: string  ) {

    return { user, token }
  }
  
}
