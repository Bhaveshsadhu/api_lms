import { emailTransporter } from './transport.js'
import { forgetPasswordEmailTemplate, userActivatedEmailTemplate, userActivationUrlEmailTemplate } from './emailTemplate.js'

export const userActivationUrlEmail = async (obj) => {
    const transport = emailTransporter();
    // console.log("Transport:", transport)

    // console.log("OBJ", obj)

    const info = await transport.sendMail(
        userActivationUrlEmailTemplate(obj)
    )
    // console.log("Info: ", info)
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
export const forgetPasswordEmail = async (obj) => {
    const transport = emailTransporter();

    const info = await transport.sendMail(
        forgetPasswordEmailTemplate(obj)
    )
    // console.log(info.messageId)
    return info.messageId;
}