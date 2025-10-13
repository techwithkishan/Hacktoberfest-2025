# 🎃 Hacktoberfest 2025 - Contribution Guidelines

Welcome to **Hacktoberfest 2025!**  
We’re thrilled you’re considering contributing to this project. Whether it's fixing a typo, improving documentation, or building a new feature — every contribution is valued and appreciated!

By following these guidelines, you help us maintain high-quality code and a collaborative, inclusive environment.

---

## 📌 Table of Contents

1. [Getting Started](#1-getting-started)
2. [Coding Standards](#2-coding-standards)
3. [Commit Message Format](#3-commit-message-format)
4. [Pull Request (PR) Process](#4-pull-request-pr-process)

---

## 1. 🚀 Getting Started

### ✅ Steps to Contribute

1. **Fork** this repository.
2. **Clone** your forked repo:
   ```bash
   git clone https://github.com/<your-username>/Hacktoberfest-2025.git
   cd Hacktoberfest-2025
   ```
3. Create a new branch with a descriptive name:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes according to the Coding Standards
5. Commit using the Coding Standards.
6. Push your branch and create a Pull Request.

## 2. 🧑‍💻 Coding Standards

Our goal is to keep the codebase clean, readable, and maintainable.

### ✨ General Principles

- **Readable Code**: Use clear, descriptive variable and function names.

- **DRY (Don't Repeat Yourself)**: Reuse logic through functions or components.

- **Single Responsibility Principle (SRP)**: Each module/class/function should do one job.


### 📜 Language-Specific Guidelines (JavaScript/TypeScript)

- Formatting: Use Prettier. Run before committing:

   ```bash
     npm run format
     # or
     yarn format
   ```

- Linting: Ensure there are no stylistic or logical issues.

   ```bash
    npm run lint
    # or
    yarn lint

   ```

- Type Safety (for TypeScript): Avoid using any unless absolutely necessary (and leave a comment explaining why).

Comments: Write comments to explain the why behind complex logic. The what should be clear from your code.

### 📝 Documentation

- Inline Docs: Public functions, classes, and complex logic must include documentation (use JSDoc

- User Docs: Update files under docs/ if your PR introduces or changes user-facing behavior.

## 3. 📝 Commit Message Format

We follow the Conventional Commits specification to maintain a clean, understandable commit history and generate changelogs automatically.

```cpp

<type>(<scope>): <short description>

[optional body]

[optional footer]

```


### 🔍 Types

| Type       | Purpose                                          |
| ---------- | ------------------------------------------------ |
| `feat`     | A new feature                                    |
| `fix`      | A bug fix                                        |
| `docs`     | Documentation changes only                       |
| `style`    | Code style changes (formatting, no logic change) |
| `refactor` | Refactoring code (no bug or feature)             |
| `perf`     | Performance improvements                         |
| `test`     | Adding or updating tests                         |
| `build`    | Changes to build tools or dependencies           |
| `ci`       | Changes to CI configuration                      |
| `chore`    | Miscellaneous changes (e.g., cleanup)            |

### 💡 Examples
```bash
feat(ui): add dark mode toggle to navbar
fix(auth): correct redirect after failed login
docs: update README with setup instructions
refactor: simplify API call logic
```

## 4. 🚀 Pull Request (PR) Process

Once your changes are ready:

✅ Before Creating a PR

- Rebase against main to avoid conflicts:

```bash
git pull origin main
git rebase main

```
- Run tests to ensure everything works:

```bash
npm test
# or
yarn test
```

---
## 🖊 PR Title & Description

- **PR Title**: Use the same format as your commit (feat(scope): description)

- Description should include:
    * A brief explanation of what you changed and why
    * Linked issues (e.g., Closes #45)
    * How to Test section with steps to verify changes
    * Screenshots or GIFs if it's a visual/UI change

## 👀 Review & Merge

- Be patient — maintainers will review as soon as possible.

- Be open to feedback and make any necessary changes.

- Once approved, your changes will be merged into main.

## 🥳 Final Words

Thank you for contributing to Hacktoberfest 2025!
Your effort makes a difference and helps the open-source community grow.
Happy coding and happy Hacktoberfest! 💻🎉


