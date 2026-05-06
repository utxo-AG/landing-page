import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Founder from "@/components/Founder";
import Agents from "@/components/Agents";
import HowItWorks from "@/components/HowItWorks";
import CustomerStories from "@/components/CustomerStories";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Agents />
        <Founder />
        <HowItWorks />
        <CustomerStories />
      </main>
      <BookingSection />
      <Footer />
    </>
  );
}
