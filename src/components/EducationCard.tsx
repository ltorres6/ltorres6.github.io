import React from 'react';

interface EducationCardProps {
  degree?: string;
  institution?: string;
  summary?: string;
  scholarData?: Publication[];
}

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number | string;
  citations: number;
  url?: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  degree,
  institution,
  summary,
  scholarData,
}) => {
  return (
    <section className="education-card">
      {degree && <h2>{degree}</h2>}
      {institution && <p>{institution}</p>}
      {summary && <p>{summary}</p>}
      {scholarData && (
        <>
          <h2>Google Scholar Profile</h2>
          <p>
            You can find my publications on{' '}
            <a
              href="https://scholar.google.com/citations?user=EfaQZA8AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar
            </a>
            .
          </p>
          {scholarData.map((publication, index) => (
            <a
              key={index}
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-card"
            >
              <h3>{publication.title}</h3>
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
            </a>
          ))}
        </>
      )}
    </section>
  );
};

export default EducationCard;
