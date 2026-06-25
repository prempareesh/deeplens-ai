# Contributing to DeepLens AI

Thank you for your interest in contributing to DeepLens AI! We welcome community contributions to help improve our deepfake detection platform. By participating in this project, you agree to abide by our Code of Conduct and standard guidelines.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all. Please be respectful, constructive, and collaborative in all communication channels.

## How Can I Contribute?

### 1. Reporting Bugs
- Check the issue tracker to ensure the bug hasn't already been reported.
- Open a new issue with a clear description, reproduction steps, and screenshots or error logs where applicable.

### 2. Suggesting Enhancements
- If you have an idea for a new feature, open a feature request issue.
- Describe the problem it solves, the proposed solution, and alternative designs you have considered.

### 3. Submitting Pull Requests
- Fork the repository.
- Create a new branch named after your feature or fix (e.g., `feature/live-webcam` or `fix/inference-timeout`).
- Keep your changes focused. Small, single-purpose pull requests are easier and faster to review.
- Write clear commit messages and ensure your code matches the existing style.
- Test your changes locally before submitting a PR.
- Submit your pull request against the `main` branch.

## Development Setup

### Python Backend
1. Navigate to the backend directory:
   ```bash
   cd CViT
   ```
2. Set up a virtual environment and install packages:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. Run the development API:
   ```bash
   python backend/main.py
   ```

### React Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Coding Guidelines

- **Python**: Follow [PEP 8](https://peps.python.org/pep-0008/) style guidelines. Use docstrings for modules, classes, and methods.
- **TypeScript/React**: Follow standard ESLint configuration. Prefer functional components and hooks. Ensure code compiles cleanly without TypeScript errors.
- **AI Models**: Do not modify core prediction or weight schemas without coordinating with the core maintainers.

## License

By contributing to DeepLens AI, you agree that your contributions will be licensed under the MIT License.
