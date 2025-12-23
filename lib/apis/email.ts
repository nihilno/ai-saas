import emailjs from "@emailjs/nodejs";

export async function sendEmail(
  email: string,
  categories: string,
  article_count: number,
  newsletterContent: string,
) {
  const templateParams = {
    email,
    categories,
    article_count,
    current_date: new Date().toLocaleDateString("pl-PL"),
    newsletterContent,
  };

  await emailjs.send(
    process.env.EMAILJS_SERVICE_ID!,
    process.env.EMAILJS_TEMPLATE_ID!,
    templateParams,
    {
      publicKey: process.env.EMAILJS_PUBLIC_KEY!,
      privateKey: process.env.EMAILJS_PRIVATE_KEY!,
    },
  );
}
