// Résumé content. Edit here; the /resume/ page and its PDF are generated from it.

export interface Role {
  org: string;
  location?: string;
  titles: string[];
  start: string;
  end: string;
  summary?: string;
  highlights: string[];
}

export const experience: Role[] = [
  {
    org: 'Flywheel',
    titles: [
      'Senior Scientific Solutions Engineer',
      'Scientific Solutions Engineer',
    ],
    start: 'July 2022',
    end: 'Present',
    highlights: [
      'Fine-tuned MedSigLIP to classify MRI contrast weighting from pixel data, demonstrating limited-data adaptation of medical foundation models to real-world tasks.',
      'Developed a retrieval-augmented generation (RAG) chatbot proof of concept that uses internal documentation to support developers with pipeline design and troubleshooting.',
      'Designed and developed automated release-note generation using LLMs in CI/CD pipelines.',
      'Lead design and deployment of scalable, containerized imaging workflows across multiple modalities (MRI, CT, PET, ophthalmic).',
      'Primary technical partner to industry and academic sites, translating research algorithms and scientific requirements into automated, validated imaging workflows for multi-institution studies, ensuring reproducibility and data integrity across sites.',
      'Built modular workflows for image curation, quality control and quantitative analysis across clinical and preclinical datasets.',
      'Oversaw ingestion and curation of external imaging datasets, directing contractor teams to ensure data quality, harmonized metadata and reproducibility standards for downstream analysis.',
      'Developed and validated modality-specific classification approaches for CT and MR, applying imaging physics to improve labeling consistency, robustness and interpretation.',
      'Consulted for imaging scientists, providing hands-on guidance in rule-based classification for MR, CT and PET.',
      'Mentored scientific engineers on designing reproducible containerized workflows, development best practices and CI/CD testing strategies.',
      'Designed custom Gears for advanced medical image processing, including segmentation, registration and feature extraction.',
      'Authored best-practice documentation for workflow containerization.',
    ],
  },
  {
    org: 'University of Wisconsin–Madison',
    titles: ['Graduate Student Researcher'],
    start: 'August 2016',
    end: 'June 2022',
    summary:
      'Completed a PhD in Medical Physics focused on quantitative MRI biomarkers and advanced reconstruction methods for pulmonary imaging.',
    highlights: [
      'Developed and validated semi-automated DCE-MRI and UTE-MRI pipelines, integrating segmentation, motion correction, parametric modeling and advanced registration and denoising, to quantify global and regional microvascular and structural lung changes in idiopathic pulmonary fibrosis and bronchopulmonary dysplasia.',
      'Collaborated with clinicians and imaging researchers to interpret imaging-derived biomarkers in the context of pulmonary physiology and disease progression across patient cohorts.',
    ],
  },
  {
    org: 'Los Alamos National Laboratory',
    titles: ['Post-Baccalaureate Researcher'],
    start: 'February 2015',
    end: 'August 2016',
    highlights: [
      'Developed software to process, analyze and visualize multi-sensor environmental imaging datasets, integrating satellite and spectroscopic data for trace gas and atmospheric modeling.',
    ],
  },
];

export interface Degree {
  degree: string;
  detail?: string;
  school: string;
  place: string;
  date?: string;
}

export const education: Degree[] = [
  {
    degree: 'PhD, Medical Physics',
    detail:
      'Improved Spatiotemporal Association of Structure and Function in Pulmonary MRI',
    school: 'University of Wisconsin–Madison',
    place: 'Madison, WI',
    date: 'June 2022',
  },
  {
    degree: 'BS, Physics',
    detail: 'Mathematics minor',
    school: 'New Mexico Institute of Mining and Technology',
    place: 'Socorro, NM',
    date: 'December 2014',
  },
];

export const skills: { group: string; note?: string; items: string[] }[] = [
  {
    group: 'Programming',
    note: 'in order of proficiency',
    items: ['Python (NumPy, CuPy, SigPy)', 'C++ / CUDA', 'MATLAB', 'R'],
  },
  {
    group: 'Tools',
    items: [
      'Flywheel',
      'Linux / Unix (bash, tcsh)',
      'Kubernetes / Docker',
      'Git',
      'Slurm / HTCondor / HPC',
      'Advanced Normalization Tools (ANTs)',
      'Berkeley Advanced Reconstruction Toolbox (BART)',
      'ITK',
    ],
  },
  {
    group: 'Techniques',
    items: [
      'Non-linear modeling and regression',
      'Image filtering and denoising',
      'Deconvolution',
      'Image segmentation',
      'Histogram analysis',
      'Non-Cartesian reconstruction',
      'Iterative compressed sensing',
      'Diffeomorphic registration',
    ],
  },
];

export const training = [
  'NVIDIA Fundamentals of Deep Learning, DLI certification (2022)',
  'Deep Learning for Medical Imaging Bootcamp (2018)',
];

export const languages = ['English (native)', 'Spanish (native)'];

/** Publication ids from src/content/publications.json shown on the résumé. */
export const resumePublications = [
  'torres-2022-erj',
  'barton-2020-ajrccm',
  'torres-2019-acadrad',
];
