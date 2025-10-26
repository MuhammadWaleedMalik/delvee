import React, { useMemo, Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { websiteInfo } from '../data/website/info';
import { colors } from '../data/colors/theme';

const LazyImage = lazy(() => import('../components/LazyImage'));

// Import language files
import enHome from '../data/text/en/home.json';
import zhHome from '../data/text/zh/home.json';
import jaHome from '../data/text/ja/home.json';
import esHome from '../data/text/es/home.json';

const languageMap = {
  en: enHome,
  zh: zhHome,
  ja: jaHome,
  es: esHome,
};

// Define types for better type safety
type CardItem = {
  title?: string;
  description?: string;
  link?: string;
  tickItems?: string[];
};

type TestimonialItem = {
  name?: string;
  role?: string;
  quote?: string;
};

type PartnerItem = {
  name?: string;
  logo?: string;
  url?: string;
};

interface HomeContent {
  page1?: {
    title?: string;
    stats?: Array<{ number?: string; label?: string; icon?: string }>;
    learnMoreLink?: { text?: string; to?: string };
    dataSourceNote?: string;
  };
  page2?: {
    title?: string;
    slides?: Array<{
      title?: string;
      description?: string;
      cta?: { text?: string; to?: string };
      image?: string;
    }>;
  };
  page3?: {
    title?: string;
    placeholder?: string;
  };
  page4?: {
    title?: string;
    description?: string;
    items?: Array<{ title?: string; date?: string }>;
  };
  page5?: {
    title?: string;
    description?: string;
    cta?: { text?: string; to?: string };
    resources?: Array<{ title?: string; date?: string }>;
  };
  page6?: {
    title?: string;
    implementers?: Array<{ name?: string; logo?: string }>;
  };
  page7?: {
    title?: string;
    partners?: Array<{ name?: string; logo?: string }>;
  };
  page8?: {
    title?: string;
    placeholder?: string;
    buttonText?: string;
  };
}

const processText = (text?: string): string => {
  if (!text) return '';
  return text
    .replace(/\{website\.name\}/g, websiteInfo?.name || '')
    .replace(/\{website\.slogan\}/g, websiteInfo?.slogan || '');
};

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as HomeContent;
  const [currentSlide, setCurrentSlide] = useState(0);

  const pageContent = useMemo(() => {
    return languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  }, [currentLanguage?.code]);

  const processedContent = useMemo(() => {
    return {
      page1: {
        title: processText(pageContent.page1?.title),
        stats: pageContent.page1?.stats || [],
        learnMoreLink: pageContent.page1?.learnMoreLink,
        dataSourceNote: processText(pageContent.page1?.dataSourceNote)
      },
      page2: {
        title: processText(pageContent.page2?.title),
        slides: pageContent.page2?.slides || []
      },
      page3: {
        title: processText(pageContent.page3?.title),
        placeholder: processText(pageContent.page3?.placeholder)
      },
      page4: {
        title: processText(pageContent.page4?.title),
        description: processText(pageContent.page4?.description),
        items: pageContent.page4?.items || []
      },
      page5: {
        title: processText(pageContent.page5?.title),
        description: processText(pageContent.page5?.description),
        cta: pageContent.page5?.cta,
        resources: pageContent.page5?.resources || []
      },
      page6: {
        title: processText(pageContent.page6?.title),
        implementers: pageContent.page6?.implementers || []
      },
      page7: {
        title: processText(pageContent.page7?.title),
        partners: pageContent.page7?.partners || []
      },
      page8: {
        title: processText(pageContent.page8?.title),
        placeholder: processText(pageContent.page8?.placeholder),
        buttonText: processText(pageContent.page8?.buttonText)
      }
    };
  }, [pageContent]);

  // Icons for stats
  const statIcons = {
    people: "👥",
    women: "👩",
    men: "👨",
    global: "🌎"
  };

  // Media assets
  const mediaAssets = {
    slide1: "https://www.delvedatabase.org/uploads/content-blocks/delve-hero2_200624_195758.jpg",
    slide2: "https://www.delvedatabase.org/uploads/content-blocks/Pauline-Mundia-ASM-challenges_2024-10-18-132945_mjbh.jpg",
    slide3: "https://www.delvedatabase.org/uploads/content-blocks/Cover-SoS.PNG",
    slide4: "https://www.delvedatabase.org/uploads/content-blocks/COVER-PAGE-Renewed-Framework-ASM.jpg",
    implementer1: "https://via.placeholder.com/200x100?text=Implementer+1",
    implementer2: "https://via.placeholder.com/200x100?text=Implementer+2",
    partner1: "https://via.placeholder.com/150x80?text=Partner+1",
    partner2: "https://via.placeholder.com/150x80?text=Partner+2",
    partner3: "https://via.placeholder.com/150x80?text=Partner+3",
    partner4: "https://via.placeholder.com/150x80?text=Partner+4",
    partner5: "https://via.placeholder.com/150x80?text=Partner+5",
    partner6: "https://via.placeholder.com/150x80?text=Partner+6",
    partner7: "https://via.placeholder.com/150x80?text=Partner+7",
    partner8: "https://via.placeholder.com/150x80?text=Partner+8"
  };

  // Next slide function
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === (processedContent.page2.slides.length - 1) ? 0 : prev + 1
    );
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? (processedContent.page2.slides.length - 1) : prev - 1
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "black" }}>
      {/* Page 1 - Stats Section */}



 






      {/* Page 2 - Slider Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-0 px-2 lg:px-1 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center" style={{ color: colors.textPrimary }}>
            {processedContent.page2.title}
          </h2>
          
          {/* Slider */}
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            {processedContent.page2.slides.map((slide, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col lg:flex-row items-center transition-opacity duration-500 ${idx === currentSlide ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full h-full'}`}
              >
                {/* Content */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: colors.textPrimary }}>
                    {slide.title}
                  </h3>
                  <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
                    {slide.description}
                  </p>
                  {slide.cta && (
                    <Link
                      to={slide.cta.to || '#'}
                      className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                      style={{ 
                        backgroundColor: "#0C4A51", 
                        color: "white"
                      }}
                    >
                      {slide.cta.text}
                    </Link>
                  )}
                </div>
                
                {/* Image */}
                <div className="lg:w-3/4">
                  <Suspense fallback={<div className="w-full h-72 bg-gray-300 animate-pulse" />}>
                    <LazyImage 
                      src={slide.image || mediaAssets[`slide${idx + 1}`]}
                      alt={slide.title || `Slide ${idx + 1}`}
                      className="w-full h-72 lg:h-96 object-contain"
                    />
                  </Suspense>
                </div>
              </div>
            ))}
            
            {/* Navigation arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {processedContent.page2.slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Page 3 - Search Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 shadow-lg"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold mb-8" style={{ color: colors.textPrimary }} >
            {processedContent.page3.title}
          </h2>
          <h2 className="text-2xl md:text-1xl  mb-8" style={{ color: colors.textSecondary }} >
                Search to find data and resources
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={processedContent.page3.placeholder}
              className="w-full px-6 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              style={{borderBottom : '2px solid #125E66'}}
            />
            <button className="absolute right-2 top-2 bg-[#125E66] text-white px-4 py-2 rounded-md">
              Search
            </button>
          </div>
        </div>
      </motion.section>

      {/* Page 4 - Items Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{ color: colors.textPrimary }}>
            {processedContent.page4.title}
          </h2>
          <p className="text-lg mb-12 text-center max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
            {processedContent.page4.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processedContent.page4.items.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3" style={{ color: colors.textPrimary }}>
                  {item.title}
                </h3>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 5 - Text and Resources Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 justify-center text-center px-40 gap-12">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.textPrimary }}>
                {processedContent.page5.title}
              </h2>
              <div className="space-y-4 mb-8" style={{ color: colors.textSecondary }}>
                {processedContent.page5.description?.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              
              {processedContent.page5.cta && (
                <Link
                  to={processedContent.page5.cta.to || '#'}
                  className="inline-block px-8 py-3 font-semibold text-left rounded-lg transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    backgroundColor: "#0C4A51", 
                    color: "white"
                  }}
                >
                  {processedContent.page5.cta.text}
                </Link>
              )}
            </div>
            
            {/* Right Column - Resources */}
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.textPrimary }}>
                Latest Resources
              </h3>
              <div className="space-y-4">
                {processedContent.page5.resources.map((resource, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold" style={{ color: colors.textPrimary }}>
                        {resource.title}
                      </h4>
                      <span className="text-sm whitespace-nowrap ml-4" style={{ color: colors.textSecondary }}>
                        {resource.date}
                      </span>
                    </div>
                    {idx < processedContent.page5.resources.length - 1 && <hr className="my-4 border-gray-300" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Page 6 - Implementers Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: colors.textPrimary }}>
            {processedContent.page6.title}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-12">
            {processedContent.page6.implementers.map((implementer, idx) => (
              <div key={idx} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <Suspense fallback={<div className="w-48 h-16 bg-gray-300 animate-pulse" />}>
                  <LazyImage 
                    src={implementer.logo || mediaAssets[`implementer${idx + 1}`]}
                    alt={implementer.name || `Implementer ${idx + 1}`}
                    className="h-16 w-auto max-w-xs"
                  />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 7 - Partners Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: colors.textPrimary }}>
            {processedContent.page7.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {processedContent.page7.partners.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <Suspense fallback={<div className="w-32 h-16 bg-gray-300 animate-pulse object-contain" />}>
                  <LazyImage 
                    src={partner.logo || mediaAssets[`partner${idx + 1}`]}
                    alt={partner.name || `Partner ${idx + 1}`}
                    className="h-full w-full object-contain "
                  />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Page 8 - Subscribe Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: "#0C4A51" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            {processedContent.page8.title}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder={processedContent.page8.placeholder}
              className="flex-grow max-w-md px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 bg-white text-[#0C4A51]">
              {processedContent.page8.buttonText}
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;