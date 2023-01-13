import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(options: any): Promise<SentMessageInfo> {
    if (!options.to) throw new Error('Email ``to`` is required');
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
      throw new Error(
        'email body is required. You can provide the html option for send the html string or text and template option for using template',
      );
    }
    if (
      (options.template && options.html) ||
      (options.template && !options.html)
    ) {
      const filePath = join(__dirname, 'templates');
      const isExists = existsSync(`${filePath}/${options.template}`);
      console.log(`${filePath}/${options.template}`);
      if (!isExists)
        throw new Error(
          'Email template path not found. Please provide file template in the template folder',
        );
      params['template'] = options.template;
    }
    if (options.html && !options.template) {
      params['html'] = options.html;
    }
    try {
      const res = await this.mailerService.sendMail(params);
      return res;
    } catch (error) {
      console.log(options);
      console.error(error);
      return { status: false };
    }
  }
}
