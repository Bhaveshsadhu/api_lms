import { emailTransporter } from './transport.js'
import { userActivatedEmailTemplate, userActivationUrlEmailTemplate, passwordResetEmailTemplate } from './emailTemplate.js'

export const userActivationUrlEmail = async (obj) => {
    const transport = emailTransporter();

    const info = await transport.sendMail(
        userActivationUrlEmailTemplate(obj)
    )
    // console.log(info.messageId)
    return info.messageId;
};

export const sendPasswordResetEmail = async (obj) => {
    const transport = emailTransporter();

    const info = await transport.sendMail(
        passwordResetEmailTemplate(obj)
    );
    // console.log(info.messageId); // It's good practice to log this
    return info.messageId;
};
export const userActivatedEmail = async (obj) => {
    const transport = emailTransporter();

    const info = await transport.sendMail(
        userActivatedEmailTemplate(obj)
    )
    // console.log(info.messageId)
    return info.messageId;
};