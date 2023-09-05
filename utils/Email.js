import emailjs from '@emailjs/nodejs';

class Email {
    constructor(name, email, message, token, templateId = process.env.EMAILJS_TEMPLATE_ID) {
       this.name = name;
       this.email = email;
       this.message = message;
       this.token = token;
       this.templateId = templateId;

    }

    async sendEmail() {
        await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            this.templateId,
            {
                from_name: "isowo",
                to_name: this.name,
                from_email: "noreply@isowo.com",
                message: this.message,
                token: this.token,
                to_email: this.email,
            }, {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
            }
        ).then(() => {
            return true;
        }). catch(() => {
            return false;
        })
    }
}

export default Email;