import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] text-[#111827]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-2 sm:px-8 lg:px-10">
        <Hero />
        <ProblemSection />
        <SolutionSection />
      </main>
      <Footer />
    </div>
  );
}
