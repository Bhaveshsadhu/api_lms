export const userActivationUrlEmailTemplate = ({ url, email, name }) => {
  return {
    from: `"Local Library" <${email}>`, // sender address
    to: email, // list of receivers
    subject: "Action Required - Activate Your new Account", // Subject line
    text: `Hello ${name} follow link to activate your account${url}`, // plain text body
    html: `<p>Hello ${name}</p>
                
                <br></br>
                <p>Your account has been created click button below to activate your account</p>
                
                <br></br>
                <br></br>
                <a href="${url}" style="
  display: inline-block;
  background: green;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
">
  Click Here
</a>
`, // html body
  }
};

export const passwordResetEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${email}>`, // sender address
    to: email, // list of receivers
    subject: "Password Reset Request", // Subject line
    text: `Hi ${name},\n\nA password reset was requested for your account.\n\nPlease click the following link to reset your password: ${url}\n\nThis link is valid for 1 hour.\n\nIf you did not request this, you can safely ignore this email.`, // plain text body
    html: `<p>Hi ${name},</p>
                
                <p>A password reset was requested for your account.</p>
                
                <p>Please click the button below to reset your password:</p>
                
                <a href="${url}" style="
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
">
  Reset Password
</a>
                
                <p>This link is valid for 1 hour.</p>
                
                <p>If you did not request this, you can safely ignore this email.</p>
`, // html body
  }
};

export const userActivatedEmailTemplate = ({ email, name }) => {
  return {
    from: `"Local Library" <${email}>`, // sender address
    to: email, // list of receivers
    subject: "USER ACTIVATED ", // Subject line
    text: `Hello ${name} `, // plain text body
    html: `<p>Hello ${name}</p>
              
              <br></br>
              <p>Your account has been Acticated, Please Login to your account</p>
              
              <br></br>
              <br></br>
              
`, // html body
  }
};