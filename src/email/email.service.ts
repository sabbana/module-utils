import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

    constructor(private readonly mailerService: MailerService) {}

    async send(options: any) : Promise<any> {
        if (!options.to) throw new Error('email to is required');
        if (!options.subject) throw new Error('email subject is required');
        if (!options.template) throw new Error('email template is required');
        if (!options.context) throw new Error('email context is required');
        const params = {
            to: options.to,
            subject: options.subject,
            template: options.template,
            context: options.context,
            attachments: options.attachments,
            cc: options.cc,
            bcc: options.bcc
        };
        try {
            await this.mailerService.sendMail(params);
            return { status: true }
        } catch (error) {
            console.error(error);
            return { status: false }
        }
    }

}
