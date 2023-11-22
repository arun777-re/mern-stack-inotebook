const nodemailer = require('nodemailer');


const sendEamail =async(email,subject,url)=>{
    const transporter =nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: { user: "arunbaaman@gmail.com" , pass: "crd.pass1" },
    })

    transporter.sendMail({
        from: 'arunbaaman@gmail.com',
        to: [email],
        subject: 'Whatever you want',
        text:"hello THIS MAIL IS FROM ME"
    },(err)=>{
        
        console.log(err.message);
    
});
    console.log("we are sending an email");
    
}

module.exports = sendEamail