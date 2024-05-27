import React, { useEffect, useState } from 'react';
import EducationCard from '../components/EducationCard';

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number | string;
  citations: number;
  url?: string; // Ensure the Publication interface includes the URL field
}

const educationData = [
  {
    degree: 'PhD in Medical Physics',
    institution:
      'Department of Medical Physics, University of Wisconsin - Madison',
    summary:
      'During my PhD, I developed advanced MRI techniques to improve the imaging of lung structure and function. My research focused on reducing motion artifacts and integrating different imaging methods to provide a more comprehensive view of diseases like Idiopathic Pulmonary Fibrosis (IPF) and Bronchopulmonary Dysplasia (BPD). I created new approaches for motion correction, allowing for clearer and more accurate imaging even in patients who have difficulty remaining still. Additionally, I combined structural and functional MRI techniques to capture a holistic view of lung health, enhancing both diagnostic capabilities and our understanding of these complex diseases. Through these innovations, my work aimed to provide clinicians with better tools for early diagnosis and monitoring of pulmonary conditions, ultimately improving patient care and outcomes.',
  },
  {
    degree: 'Masters in Medical Physics',
    institution:
      'Department of Medical Physics, University of Wisconsin - Madison',
  },
  {
    degree: 'B.S. in Physics',
    institution:
      'Department of Physics, New Mexico Institute of Mining and Technology',
  },
];

const Education: React.FC = () => {
  const [scholarData, setScholarData] = useState<Publication[]>([]);

  useEffect(() => {
    fetch('/src/assets/publications.json')
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
      <h1>Education</h1>
      {educationData.map((edu, index) => (
        <EducationCard
          key={index}
          degree={edu.degree}
          institution={edu.institution}
          summary={edu.summary}
        />
      ))}
      <EducationCard scholarData={scholarData} />
    </main>
  );
};

export default Education;
