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
      <div className="publications-header">
        <h1>Publications</h1>
        <p>
          Research contributions in medical physics and imaging, with a focus on
          advanced MRI techniques for lung imaging and diagnostics.
        </p>
      </div>
      <div className="publications-list">
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
              <strong>Year:</strong> {publication.year} | <strong>Citations:</strong>{' '}
              {publication.citations}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Publications;
