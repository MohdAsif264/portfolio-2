import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from '../ui/ScrollProgress';
import { WhatsAppButton } from '../ui/WhatsAppButton';

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-500">
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
