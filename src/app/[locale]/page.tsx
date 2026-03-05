import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Founder from "@/components/Founder";
import Agents from "@/components/Agents";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import CTABar from "@/components/CTABar";
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
        <Portfolio />
        <TrustBar />
      </main>
      <CTABar />
      <Footer />
    </>
  );
}
