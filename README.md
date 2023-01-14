<p align="center">
  <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/arrow_loop3.png" width="75">
</p>

# Module Utils
Module utils adalah kumpulan module atau service yang menangani task tertentu dan dapat digunakan pada module atau service lain yang membutuhkan spt:
- Pengiriman email
- Pengiriman SMS OTP
- File Storage dll

## Module Mailer
Module ini bisa kita gunakan untuk keperluan pengiriman email (email relay), baik menggunakan standard protocol SMPT maupun email service provider seperti : mailgun, sendggrid, mailgun, sendinblue maupun mailtrap.

Dengan menggunakan module/service ini kita tinggal melakukan konfigurasi credential pada environment varible project sbb:

```
# PROVIDER SUPPORT [mailtrap, sendinblue, mailgun, sendgrid, and standard smtp protocol]
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
```
Setelah memasukkan credential pada variable enviroment, langkah selanjutnya kita bisa menggunakan service/module ini dengan meng-inject (DI) pada service atau controller lain yang membutuhkan.

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
pada parameter options, ada minimum attribute yang harus ada antara lain:
```
{
  to: <email destination | string or array string[] for multiple recepient>,
  subject: <email subject | string>,
  html: <email body bisa berupa plaintext maupun html string>, atau
  template: <email body menggunakan template file .hbs>
}
```
selain attribute diatas, ada beberapa attribute yang bisa kita gunakan (optional) antara lain:
```
{
  ...
  cc: <email cc | string or array string>,
  bcc: <email bcc | string or array string>,
  context: <object data yang akan dikirim dan dimasukkana ke dalam template>,
  attachments: <email attachment | list object filename, path>
}
```

## Author
- @bukan_hokage <mailto: sabbana.a7@gmail.com>
