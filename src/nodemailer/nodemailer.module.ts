import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodemailerService } from './nodemailer.service';
import { nodemailerConfig } from './config';

@Module({
  imports: [MailerModule.forRoot(nodemailerConfig)],
  providers: [NodemailerService],
  exports: [NodemailerService]
})
  
export class NodemailerModule {}
