import React, { useEffect, useState } from 'react';
import '../styles/Publications.css';

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number | string;
  citations: number;
  url?: string;
}

const Publications: React.FC = () => {
  const [scholarData, setScholarData] = useState<Publication[]>([]);

  useEffect(() => {
    fetch('/assets/publications.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setScholarData(data))
      .catch((error) => console.error('Error fetching publications:', error));
  }, []);

  return (
    <main>
      <h1>Publications</h1>
      <section>
        <h2>Google Scholar Profile</h2>
        {scholarData.map((publication, index) => (
          <div key={index} className="publication-card">
            <h3>
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {publication.title}
              </a>
            </h3>
            <p>
              <strong>Authors:</strong> {publication.authors}
            </p>
            <p>
              <strong>Journal:</strong> {publication.journal}
            </p>
            <p>
              <strong>Year:</strong> {publication.year}
            </p>
            <p>
              <strong>Citations:</strong> {publication.citations}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Publications;
