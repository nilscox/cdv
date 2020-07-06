import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';
import { Roles } from 'Common/roles.decorator';

import { Role } from '../authorization/roles.enum';

import { AuthorizedEmail } from './authorized-email.entity';
import { CreateAuthorizedEmailInDto } from './dtos/create-authorized-email-in.dto';
import { SendTestEmailInDto } from './dtos/send-test-email-in.dto';
import { EmailService } from './email.service';

@Controller('email')
@UseInterceptors(ClassToPlainInterceptor)
export class UserController {

  constructor(
    private readonly emailService: EmailService,
  ) {}

  @Get('authorized')
  @Roles(Role.ADMIN)
  async findAll(): Promise<AuthorizedEmail[]> {
    return this.emailService.findAllAuthorized();
  }

  @Post('authorize')
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateAuthorizedEmailInDto): Promise<AuthorizedEmail> {
    if (await this.emailService.isAthorized(dto.email))
      throw new BadRequestException(`email ${dto.email} already authorized`);

    return this.emailService.authorize(dto.email);
  }

  @Post('test')
  @Roles(Role.ADMIN)
  async test(@Body() dto: SendTestEmailInDto): Promise<void> {
    await this.emailService.sendTestEmail(dto.to, dto.subject, dto.value);
  }

}
