<p align="center">
  <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/arrow_loop3.png" width="75">
</p>

# Module Utils
Module utils are a collection of modules or services that handle certain tasks and can be used in other modules or services that require such as:
- Sending email
- Sending SMS/OTP
- File Storage etc

## Module Mailer
We can use this module for sending email (email relay), using both the SMPT standard protocol and email service providers such as: mailgun, sendgrid, mailgun, sendinblue and mailtrap.

By using this module/service, all we have to do is configure the credentials for the project's environment variables as follows:

```
# PROVIDER SUPPORT [mailtrap, sendinblue, mailgun, sendgrid, and standard smtp protocol]
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
```
After defining the credentials in the environment variables, the next step is that we can use this service/module by injecting (DI) it into another service or controller that needs it.

```
import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {

  constructor(private readonly mailService: EmailService) {}

  sendMail(options: any) {
    return this.mailService.send(options);
  }
}

```
in the options parameter, there is a minimum attribute that must be set, including:
```
{
  to: <email destination | string or array string[] for multiple recepient>,
  subject: <email subject | string>,
  html: <email body bisa berupa plaintext maupun html string>, or
  template: <email body menggunakan template file .hbs>
}
```
Besides that, there are several attributes that we can use (optional), including:
```
{
  ...
  cc: <email cc | string or array string>,
  bcc: <email bcc | string or array string>,
  context: <object data yang akan dikirim dan dimasukkana ke dalam template>,
  attachments: <email attachment | list object filename, path>
}
```

## SMS Module

## Author
- @bukan_hokage <mailto: sabbana.a7@gmail.com>
