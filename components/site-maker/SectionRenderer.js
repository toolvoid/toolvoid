import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import GallerySection from './sections/GallerySection';
import ServicesSection from './sections/ServicesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import VideoSection from './sections/VideoSection';
import FaqSection from './sections/FaqSection';
import TextSection from './sections/TextSection';
import SupportSection from './sections/SupportSection';
import PartnersSection from './sections/PartnersSection';
import FooterSection from './sections/FooterSection';

const renderers = {
  hero: HeroSection,
  about: AboutSection,
  gallery: GallerySection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  pricing: PricingSection,
  contact: ContactSection,
  video: VideoSection,
  faq: FaqSection,
  text: TextSection,
  support: SupportSection,
  partners: PartnersSection,
  footer: FooterSection,
};

export default function SectionRenderer({ section, ...props }) {
  const Renderer = renderers[section.type];
  return <Renderer section={section} {...props} />;
}
