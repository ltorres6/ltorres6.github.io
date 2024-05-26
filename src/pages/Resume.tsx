import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const Resume: React.FC = () => {
  const [docContent, setDocContent] = useState<string | null>(null);
  const googleDocUrl =
    'https://docs.google.com/document/d/e/2PACX-1vTBAsX8D242RD9jhJxSEcr442xt7Nd-qe2ZSsvfyWgEuNkMprj9kPivNSHBFAfQLLwVAkiwfRJ5gBSn/pub';

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await fetch(googleDocUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Remove unwanted elements (banner)
        const unwantedSelectors = [
          '#banners', // Remove banner container
          '#publish-banner', // Remove banner itself
          '#publish-banner-icon', // Remove icon in banner
          '#publish-banner-text', // Remove text in banner
          'footer', // Remove footer if exists
          'a[target="_blank"]', // Remove "Report abuse" and similar links
        ];
        unwantedSelectors.forEach((selector) => {
          doc.querySelectorAll(selector).forEach((el) => el.remove());
        });

        // Extract the content you want to keep
        const bodyContent = doc.body.innerHTML;

        // Remove unwanted text by manipulating the content
        const filteredContent = bodyContent.replace(
          /Published using Google Docs.*Updated automatically every 5 minutes/,
          '',
        );
        setDocContent(filteredContent);
      } catch (error) {
        setDocContent('Failed to load document content');
      }
    };

    fetchDoc();
  }, []);

  return (
    <div className="resume-container">
      <main className="center-content">
        <section>{docContent ? parse(docContent) : <p>Loading...</p>}</section>
      </main>
    </div>
  );
};

export default Resume;
