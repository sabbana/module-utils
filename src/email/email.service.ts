import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class EmailService {

  constructor(private readonly mailerService: MailerService) {}

  async send(options: any): Promise<SentMessageInfo> {
    if (!options.to) throw new Error('Email to is required');
    if (!options.subject) throw new Error('email subject is required');
    const params = {
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      context: options.context,
      attachments: options.attachments,
    };
    if (!options.html && !options.template) {
      throw new Error(`
        Email body is required. 
        You can provide the html option for send the html string or text and template option for using template.
        Plase provide email template in templates folder in the email module. 
        For more detail please read the documentation here https://github.com/sabbana/module-utils#readme`);
    }
    if (
      (options.template && options.html) ||
      (options.template && !options.html)
    ) {
      const filePath = join(__dirname, 'templates');
      const filename = options.template.split('.')[0];
      const isExists = existsSync(`${filePath}/${filename}.hbs`);
      if (!isExists) {
        throw new Error(
          'Email template not found. Please provide template file in the templates folder',
        );
      }
      params['template'] = `${filePath}/${filename}.hbs`;
    }
    if (options.html && !options.template) {
      params['html'] = options.html;
    }
    try {
      const res = await this.mailerService.sendMail(params);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: error.responseCode,
          message: error.response,
          error
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
