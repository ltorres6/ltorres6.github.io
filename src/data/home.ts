// Home page highlights. Phase 2 replaces these with the publications and
// projects content collections; until then they are curated here.

/** From Google Scholar, checked 2026-10-04. */
export const scholarStats = {
  publications: 26,
  citations: 238,
  hIndex: 7,
};

export interface Project {
  name: string;
  kind: string;
  url: string;
  summary: string;
  tags: string[];
}

export const featuredProjects: Project[] = [
  {
    name: 'fw-classification',
    kind: 'Open-source package · ISMRM 2024',
    url: 'https://archive.ismrm.org/2024/3121.html',
    summary:
      'An open-source package for classifying MRI scans, so large imaging datasets can be sorted and curated automatically.',
    tags: ['Python', 'MRI', 'Flywheel'],
  },
  {
    name: 'OSIPI ASL library',
    kind: 'Community library · ISMRM 2025',
    url: 'https://archive.ismrm.org/2025/3692_Nv2N2aQQv.html',
    summary:
      'A composite Python library for arterial spin labelling image processing, built with the ISMRM Open Science Initiative for Perfusion Imaging.',
    tags: ['Python', 'Perfusion', 'Open science'],
  },
  {
    name: 'imoco',
    kind: 'Reconstruction · GitHub',
    url: 'https://github.com/ltorres6/imoco',
    summary:
      'A Python version of the iMoCo motion-compensated lung MRI reconstruction, packaged with uv so it installs and runs in one step.',
    tags: ['Python', 'UTE MRI', 'uv'],
  },
];

export interface SelectedPub {
  year: number;
  title: string;
  /** Author list with Luis's name wrapped in ** for emphasis. */
  authors: string;
  venue: string;
  url?: string;
  doi?: string;
  citations?: number;
  firstAuthor?: boolean;
}

export const selectedPublications: SelectedPub[] = [
  {
    year: 2026,
    title:
      'Comparison of retrospective motion compensation techniques for pulmonary dynamic ultrashort time to echo MRI in suspected idiopathic pulmonary fibrosis',
    authors:
      'Kizhakke Puliyakote AS, **Torres LA**, AlAtoum A, AlArab N, Johnson KM, et al.',
    venue: 'Journal of Magnetic Resonance Imaging',
  },
  {
    year: 2022,
    title:
      'Hyperpolarized 129Xe MR spectroscopy in the lung shows 1-year reduced function in idiopathic pulmonary fibrosis',
    authors: 'Hahn AD, Carey KJ, Barton GP, **Torres LA**, Kammerman J, et al.',
    venue: 'Radiology',
    url: 'https://pubs.rsna.org/doi/abs/10.1148/radiol.211433',
    doi: '10.1148/radiol.211433',
    citations: 38,
  },
  {
    year: 2022,
    title:
      'Dynamic contrast enhanced MRI for the evaluation of lung perfusion in idiopathic pulmonary fibrosis',
    authors: '**Torres LA**, Lee KE, Barton GP, Hahn AD, Sandbo N, et al.',
    venue: 'European Respiratory Journal',
    url: 'https://publications.ersnet.org/content/erj/60/4/2102058.abstract',
    citations: 26,
    firstAuthor: true,
  },
  {
    year: 2022,
    title:
      'Dynamic imaging using motion-compensated smoothness regularization on manifolds (MoCo-SToRM)',
    authors: 'Zou Q, **Torres LA**, Fain SB, Higano NS, Bates AJ, Jacob M.',
    venue: 'Physics in Medicine & Biology',
    url: 'https://iopscience.iop.org/article/10.1088/1361-6560/ac79fc/meta',
    doi: '10.1088/1361-6560/ac79fc',
    citations: 28,
  },
  {
    year: 2019,
    title:
      'Structure-function imaging of lung disease using ultrashort echo time MRI',
    authors: '**Torres L**, Kammerman J, Hahn AD, Zha W, Nagle SK, et al.',
    venue: 'Academic Radiology',
    url: 'https://www.sciencedirect.com/science/article/pii/S107663321830566X',
    citations: 91,
    firstAuthor: true,
  },
];
