import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">Contact Form</h1>

      <ContactForm />
    </main>
  );
}
