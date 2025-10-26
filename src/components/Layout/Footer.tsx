import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { websiteInfo } from '../../data/website/info';

// Import all language files statically
import enFooter from './en/footer.json';
import jaFooter from './ja/footer.json';
import zhFooter from './zh/footer.json';
import esFooter from './es/footer.json';

// Create a language map
const languageMap = {
  en: enFooter,
  ja: jaFooter,
  zh: zhFooter,
  es: esFooter,
};

interface FooterContent {
  disclaimer: {
    text: string;
  };
  sections: {
    title: string;
    links: {
      path: string;
      label: string;
    }[];
  }[];
  copyright: {
    text: string;
  };
}

const Footer: React.FC = () => {
  const { currentLanguage } = useLanguage();

  // Get page content directly from languageMap, default to English if not found
  const pageContent: FooterContent = useMemo(() => languageMap[currentLanguage.code as keyof typeof languageMap] || languageMap.en, [currentLanguage.code]);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-white"
      style={{ zIndex: 99 }}
    >
      {/* Disclaimer Banner */}
      <div className="bg-pink-700 text-white text-sm py-2 px-4 text-center">
        {pageContent.disclaimer.text}
      </div>

      {/* Main Footer Content */}
      <div className="bg-white text-black py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
          {/* Navigation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 md:mb-0">
            <div>
              <h3 className="text-lg font-semibold mb-2">{pageContent.sections[0].title}</h3>
              <ul className="space-y-1">
                {pageContent.sections[0].links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-sm hover:underline text-pink-700">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{pageContent.sections[1].title}</h3>
              <ul className="space-y-1">
                {pageContent.sections[1].links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-sm hover:underline text-pink-700">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{pageContent.sections[2].title}</h3>
              <ul className="space-y-1">
                {pageContent.sections[2].links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-sm hover:underline text-pink-700">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{pageContent.sections[3].title}</h3>
              <ul className="space-y-1">
                {pageContent.sections[3].links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-sm hover:underline text-pink-700">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="max-w-7xl mx-auto px-4 mt-6 text-center">
          <p className="text-sm">{pageContent.copyright.text} {new Date().getFullYear()} {websiteInfo.name}. All Rights Reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;