import nodemailer from 'nodemailer';

class Email {
    /**
     * 
     * @param {
     *  from : string //This will be the email address we are sending the email from
     *  to: array || string // This will be an array or a string.
     *  subject: string // This is the subject of the email.
     *  text: string // the message to be sent in text format.
     *  html: string // sending message body as html.
     *  replyTo: string // the email to reply the message.
     *  attachment: array // this is an array.
     *    
     * } 
     */
    constructor({from="samezchi@gmail.com", to, subject, html="", text="", replyTo=""}) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;        
        this.replyTo = replyTo;
    }

    setAttachment(attachment) {
        this.attachment = attachment;
    }

    async sendEmail() {
        // set email transport
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.sendgrid.net",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: 'apikey', // generated ethereal user
                  pass: process.env.SENDGRID_API_KEY // generated ethereal password
                },
            });
    
            // email options
            const mailerOptions = {
                to: this.to,
                from: this.from,
                subject: this.subject,
                text: this.text,
                html: this.html,
                replyTo: (this.replyTo !== "") && this.replyTo,
                attachments: (this.attachment && this.attachment.length > 0) && this.attachment
            }
            const info = await transporter.sendMail(mailerOptions);
            return info;
        } catch (err) {
            return err
        }        
    }
}

export default Email;