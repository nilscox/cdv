import { Injectable } from '@nestjs/common';
import * as email from 'emailjs';

import { User } from '../user/user.entity';

const {
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = process.env;

@Injectable()
export class EmailService {

  private sendEmail(to: string, subject: string, body: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const conn = email.server.connect({
        host: EMAIL_HOST,
        user: EMAIL_USER,
        password: EMAIL_PASSWORD,
        ssl: true,
      });

      conn.send({
        from: 'Chercheurs de vérité <reply-if-you-want@nils.cx>',
        to,
        subject,
        text: body,
      }, (err, message) => {
        if (err)
          reject(err);
        else
          resolve(message);
      });
    });
  }

  sendEmailValidationEmail(user: User): Promise<any> {
    return this.sendEmail(
      user.email,
      '[CDV] Confirmez votre adresse email',
      `token: "${user.emailValidationToken}"`,
    );
  }

}
