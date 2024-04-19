import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodemailerService {
  constructor(private mailService: MailerService) { }
  sendResetPasswordCode(email: string, code: number) {
    return this.mailService.sendMail({
      to: email,
      from: 'sepyh8@gmail.com',
      subject: 'Reset Password',
      html: `
      <div>
        <p>Activation code: ${code}</p>
      </div>
    `,
    });
  }
}
