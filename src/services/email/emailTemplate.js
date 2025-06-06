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
export const forgetPasswordEmailTemplate = ({ email, name, link }) => {
  return {
    from: `"Local Library" <${email}>`, // sender address
    to: email, // list of receivers
    subject: "Forget Password ", // Subject line
    text: `Hello ${name} `, // plain text body
    html: `<p>Hello ${name}</p>
              
              <br></br>
              <h2>Hello ${name}</h2>
              <p>Here is your Link to reset the password Please click this Link to reset the password</p>
              <a href="${link}"> RESET PASSWORD</a>
              <br></br>
              <br></br>
              
`, // html body
  }
};