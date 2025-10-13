**FRONT END APPLICATION USER GUIDE :**

**(For React)**

Table of contents :

1.Overview

2.System Requirements

3. Project Setup

4. Folder Structure

5. Running the Application

6. Environment configuration

7. Common commands

8. Build and Deployment

9. Code standards

10. Testing

11. Trouble Shooting

12. Best Practices

13. References

- **Overview**

React is a powerful JavaScript library for building fast, scalable front-end applications. It is created by Facebook (now Meta) and is known for its component-based structure, single-page applications (SPAs), and virtual DOM, enabling efficient UI updates and a seamless user experience.

**Why learn React ?**

Before React, front-end development struggled with :

- **Manual DOM manipulation** : Traditional JavaScript directly modified the DOM, slowing down the performance.
- **Complex state management** : Maintaining UI state became messy and hard to debug.
- **Tight Coupling in Frameworks** : Frameworks like Angular introduced complex two-way data binding that made code harder to merge.

Frontend application is built using **React,** a modern JavaScript library for building interactive user interfaces. It integrates with backend APIs and external services to deliver a seamless user experience.

**Key Technologies:**

- **React 18+**
- **Vite / Create React App / Next.js (it depends on the project)**
- **Tailwind CSS or styled components**
- **React Router for navigation**
- **TypeScript (optional)**
- **Axios / Fetch API for HTTP requests**
- **ESLint + Prettier for linting and code formatting**

- **System Requirements**

                     | **Requirement** | **Recommended Version**               |
                      -----------------| ------------------------------------  |
                     | Node.js         |     1.8x or higher      	       |
                     | npm   	       |     9.x or higher       	       |
                     | Yarn (optional) |          1.22+          	       |
                     | Git             |          2.30+          	       |
                     | Browser         | Latest Chrome, Edge, firefox or Safari|


-> 3: **PROJECT SETUP**

**Step 1 : Clone the Repository**

**(**in git bash**)**
------------------------------------------------------------------
|      								                              |
| **git clone <https://github.com/your-repo/frontend-app.git>**   |
|								                                  |
| **cd frontend-app**						                      |
-------------------------------------------------------------------

**Step 2 : Install Dependencies**

Using npm: (in git bash)

-----------------
|**npm install** |
-----------------

Or using yarn :
------------------
|**yarn install**|
------------------

**Step 3 : Configure System Variables:**

Create a .env file in the root directory:

(in bash)


**cp .env.example .env**


After doing the above step, please update the values (e.g. API URL, authentication keys)

**Example:**


**REACT_APP_API_URL = <https://example.api.com>**

**REACT_APP_ENV = development**


- **FOLDER STRUCTURE**

A usual React Project structure looks like the below :

project-name/
├── public/                # Static files (index.html, favicon, etc.)
├── src/
│   ├── api/               # API handlers and HTTP utilities
│   ├── assets/            # Images, fonts, icons
│   ├── components/        # Reusable UI components
│   ├── context/           # Global state providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page-level components
│   ├── routes/            # Application routing
│   ├── styles/            # CSS, SCSS, or Tailwind files
│   ├── utils/             # Helper functions
│   ├── App.tsx            # Root application component
│   └── main.tsx           # Entry point
├── .env                   # Environment configuration
├── package.json
└── README.md



- **RUNNING THE APPLICATION :**

**Development mode :**

**( in bash)**


**npm start**

**(or)**

**yarn start**


**The app will be hosted on :** <http://localhost:3000>



- **ENVIRONMENT CONFIGURATION:**

		|   **Variable**       |  **Description**    |      **Example**   	     |
		| -----------------    | ------------------  | ------------------------------|
		| REACT_APP_API_URL    | Base API endpoint   | <https://api.example.com>     |
		| REACT_APP_ENV        |  Environment name   |   development/production      |
		| REACT_APP_GOOGLE_KEY | Third-party API key |        SMDDmmI…               |

**Important :** All environment variables must start with **REACT_APP_** to be accessible in the browser.

- **COMMON COMMANDS:**

				| **Command**   | 	   **Description**              |
				| ------------- | --------------------------------- |
				| npm start     | Run app in development mode       |
				| npm run build | Build production-optimized bundle |
				| npm test   	| 	Run unit tests                  |
				| npm run format| 	Format code using prettier      |
				| Npm run lint  | 	Run ESLint checks	            |


- **BUILD AND DEPLOYMENT :**

**Building the project :**

Generate an optimized production build :

**npm run build**

**(**or**)**

**yarn build**

This will create build/ or dist/ folder containing static production assets.

**Deployment :**

You can deploy the built files to:

**Static hosts** like Vercel, Render, Netlify or AWS S3 etc.

**Web servers** (ex : Apache, Nginx)

**Containerized environments (**Docker, Kubernetes**)**


- **CODE STANDARDS:**

**ESLint:** It ensures code quality and consistency. It checks for syntax issues, anti-patterns and style violations.

Running lint checks :

**npm run lint**

Auto-fix common issues :

**npm run lint -- --fix**

**Example lint configuration :**


			module.exports = {
  				extends: ['airbnb', 'airbnb/hooks', 'prettier'],
 				 rules: {
   				 'no-console': 'warn',
   				 'react/prop-types': 'off',
  				},
			};



To make the code much cleaner (alignment, indentation etc), you can use :


**npm run format**


- **TESTING**

Most React projects include unit testing using :

- **Jest (**test runner**)**
- **React testing library** (for UI testing)
- **Cypress / Playwright** (for end-to-end testing)

**To run test,**


**npm test**


- **TROUBLESHOOTING:**

The below table consists of few issues and their possible causes:

				| **Issue** 			  | **Possible Cause** 		 | 		**Solution**	                |
				| ------------------------------- | -----------------------------| ------------------------------------------   |
				| App doesn't start 		  | Missing dependencies	 | Run "npm install"			        |
				| Blank Screen on load 		  | Routing misconfiguration     | Add fall back route of check base URL        |
				| API requests falling 		  | Wrong API URLs or CORS issue | Verify ".env" values & backend CORS setup    |
				| CSS not applied 		  | Build pipeline misconfigured | Check style imports of Tailwind/PostCSS setup|
				| Environment variables undefined | Missing REACT_APP_ prefix    | Ensure variables follow React's naming rule  |


**Few tips on debugging:**

- Use React Developer Tools in the browser.
- Check network requests using Chrome DevTools -> Network Tab.
- Review console errors missing files or syntax issues.

- **BEST PRACTICES:**

- Use functional Components and React Hooks.
- Keep components small and reusable.
- Centralize API logic in a dedicated module.
- Manage global state with Context API or Redux.
- Use .env for configurable values - never hard-code secret values.
- Commit code only after linting and formatting.
- Version control through **Git** with clear commit messages.

- **REFERENCES:**

**React Official Docs :** <https://react.dev>

**Create a React App :** <https://create-react-app.dev>

**ESLint Documentation :** <https://eslint.org>

**Vite Documentation:** <https://vitejs.dev>

**Prettier Docs :** <https://prettier.io>

**React Testing Library :** <https://testing-library.com>