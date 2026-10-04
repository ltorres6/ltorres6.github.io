# Luis Torres, PhD - Professional Portfolio

A modern, professional portfolio website for Luis Torres, PhD - Medical Physicist and Scientific Solutions Engineer.

## 🌐 Live Site

Visit the live site at [luistorresphd.com](https://luistorresphd.com)

## 🎨 Design Philosophy

This portfolio features a clean, professional design with:

- **Modern Academic Aesthetic**: Navy blue and gold color palette
- **Professional Typography**: Inter font family for clarity and readability
- **Responsive Design**: Optimized for all devices
- **Accessibility**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables
- **Deployment**: GitHub Pages
- **Backend Utilities**: Python (Poetry managed)

## 📋 Features

### Core Pages

- **Home**: Professional hero section with call-to-action buttons
- **About**: Professional biography and background
- **Education**: Academic credentials and achievements
- **Publications**: Google Scholar integration with automated publication fetching
- **Projects**: GitHub and GitLab contribution calendars
- **Resume**: Embedded Google Docs CV
- **Contact**: Professional contact form

### Key Integrations

- **Google Scholar**: Automated publication fetching via Python script
- **Google Docs**: Dynamic resume embedding
- **GitHub/GitLab**: Contribution calendar visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Python 3.10+ (for publication fetching)

### Installation

```bash
# Install Node dependencies
npm install

# Install Python dependencies (optional, for updating publications)
poetry install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Updating Publications

```bash
# Run the Python script to fetch latest publications from Google Scholar
poetry run python src/utils/fetch_publications.py
```

## 📁 Project Structure

```
├── public/
│   ├── assets/
│   │   ├── publications.json    # Auto-generated from Google Scholar
│   │   └── pedro.webp           # Professional photo
│   └── CNAME                     # Custom domain configuration
├── src/
│   ├── components/               # React components
│   ├── pages/                    # Page components
│   ├── styles/                   # CSS stylesheets
│   ├── utils/                    # Utility scripts
│   └── App.tsx                   # Main app component
└── package.json
```

## 🎨 Design System

### Color Palette

- **Primary Navy**: `#1a365d`
- **Secondary Navy**: `#2c5282`
- **Accent Gold**: `#d4a574`
- **White**: `#ffffff`
- **Off White**: `#f7fafc`

### Typography

- **Font Family**: Inter
- **Headings**: 600 weight
- **Body**: 400 weight

## 📝 License

© 2024 Luis Torres. All rights reserved.

## 🤝 Contact

For inquiries, please visit the [contact page](https://luistorresphd.com/contact).
