# Project Structure

This document explains the organization and contents of the folders within the DeepLens AI repository.

```
deeplens-ai/
├── CViT/                   # AI Core & FastAPI Backend
│   ├── backend/            # FastAPI Application Source Code
│   │   ├── ai_model/       # CViT and CViT2 model definitions in PyTorch
│   │   ├── api/            # FastAPI route handlers (e.g. /predict)
│   │   ├── services/       # Prediction pipelines and orchestration
│   │   ├── uploads/        # Temporal storage for incoming media uploads
│   │   └── utils/          # Helpers for face extraction (BlazeFace, loaders)
│   ├── helpers/            # Original helper modules for standalone CLI training/prediction
│   ├── json_file/          # Evaluation lists and JSON files for deepfake datasets
│   ├── model/              # PyTorch model definitions for standalone scripts
│   ├── preprocessing/      # Data preprocessing and face extraction scripts
│   ├── sample__prediction_data/ # Sample videos used for testing inference
│   ├── sample_train_data/  # Small sample dataset of real/fake images for training validation
│   ├── weight/             # Local directory for AI model weights (.pth files)
│   ├── cvit_prediction.py  # CLI tool for running predictions on media
│   ├── cvit_train.py       # CLI tool for retraining CViT models
│   ├── requirements.txt    # Python dependencies for the backend and AI models
│   └── verify_backend.py   # Development script for checking model weight loading and inference
│
├── docs/                   # Research Papers, Presentations & Media
│   ├── CViT.pptx           # Academic slides explaining the Convolutional Vision Transformer architecture
│   └── Deressa_Wodajo_MS_Thesis_2020.pdf # Master's Thesis detailing the core CViT model implementation
│
├── frontend/               # React Web Application (Vite + TypeScript)
│   ├── public/             # Static public assets (icons, favicons)
│   ├── src/                # React source code
│   │   ├── assets/         # App-specific SVG and CSS design assets
│   │   ├── components/     # Reusable layout and UI components (Cards, Buttons, Modals)
│   │   ├── context/        # React context states (Toast notifications, Detection history)
│   │   ├── pages/          # Platform page components (Landing, Detector, Dashboard, History, Docs, About)
│   │   ├── App.tsx         # Main layout wrapper and page routing configuration
│   │   └── main.tsx        # Vite frontend application entry point
│   ├── package.json        # Frontend NPM script definitions and dependencies
│   ├── tsconfig.json       # TypeScript compiler settings
│   └── vite.config.ts      # Vite server configuration
│
├── LICENSE                 # MIT License details
├── CHANGELOG.md            # Release version history tracker
├── CONTRIBUTING.md         # Open-source contributions guidelines
└── README.md               # Main project overview and setup guide
```

---

## Detailed Directory Breakdown

### 1. `CViT/`
This folder contains the complete AI engine and backend system.
- **`backend/`**: Hosts the FastAPI server. It processes incoming media uploads, runs the BlazeFace extraction pipeline, performs inference using PyTorch, and returns structural prediction results.
- **`helpers/` & `model/`**: Houses modules used by standalone CLI scripts for training and testing.
- **`weight/`**: Serves as the storage directory for weight checkpoints (`.pth` files). Note that these checkpoints are ignored in Git due to size limitations and are downloaded via Hugging Face.

### 2. `docs/`
Hosts scientific references that underpin the project.
- **`Deressa_Wodajo_MS_Thesis_2020.pdf`**: The foundational master's thesis research.
- **`CViT.pptx`**: The slides summarizing the self-attention spatial patch networks.

### 3. `frontend/`
Houses the reactive web application built with React, Vite, and Tailwind/Vanilla CSS.
- **`src/components/`**: UI building blocks (e.g. `FileUpload.tsx`, `HistoryChart.tsx`).
- **`src/pages/`**: Includes pages for detection (`Detect.tsx`), visual dashboards (`Dashboard.tsx`), audit history logs (`History.tsx`), and research explanations (`About.tsx`).
