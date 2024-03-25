import type { NextApiRequest, NextApiResponse } from "next";
// import type { NextRequest } from "next";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
  const { name, email, message } = await req.json();
  console.log(name, email, message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.USER,
    subject: `Website Submission from ${name}`,
    replyTo: email,
    html: `
      <p>Name:</p>
      <p>  ${name} </p>
      <p>Message:</p>
      <p>  ${message} </p>
      <p>Email:</p>
      <p>  ${email} </p>
    `,
    text: `${message} Send from ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ status: "Ok" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
};
