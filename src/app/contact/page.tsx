"use client";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { PublicNavbar } from "@/components/PublicNav";

export default function ContactPage() {
  return (
    <>
      <PublicNavbar />
      <ContactForm />
      <Footer />
    </>
  );
}
