<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements
	<!-- Page rendering demo workspace with examples of CSR, SSR, SSG, ISR, and hybrid rendering using Next.js, React, and Node.js -->

- [x] Scaffold the Project
	<!--
	Ensure that the previous step has been marked as completed.
	Call project setup tool with projectType parameter.
	Run scaffolding command to create project files and folders.
	Use '.' as the working directory.
	If no appropriate projectType is available, search documentation using available tools.
	Otherwise, create the project structure manually using available file creation tools.
	-->

- [x] Customize the Project
	<!--
	Verify that all previous steps have been completed successfully and you have marked the step as completed.
	Develop a plan to modify codebase according to user requirements.
	Apply modifications using appropriate tools and user-provided references.
	Skip this step for "Hello World" projects.
	-->

- [x] Install Required Extensions
	<!-- No specific extensions mentioned in project setup info -->

- [x] Compile the Project
	<!--
	Verify that all previous steps have been completed.
	Install any missing dependencies.
	Run diagnostics and resolve any issues.
	Check for markdown files in project folder for relevant instructions on how to do this.
	-->

- [x] Create and Run Task
	<!--
	Verify that all previous steps have been completed.
	Check https://code.visualstudio.com/docs/debugtest/tasks to determine if the project needs a task. If so, use the create_and_run_task to create and launch a task based on package.json, README.md, and project structure.
	Skip this step otherwise.
	 -->

- [x] Launch the Project
	<!--
	Verify that all previous steps have been completed.
	Prompt user for debug mode, launch only if confirmed.
	 -->

- [x] Ensure Documentation is Complete

## Page Rendering Demo Workspace

This workspace demonstrates different page rendering strategies in modern web development using Next.js 14:

### Rendering Methods
- **CSR (Client-Side Rendering)** - `/csr` - JavaScript renders content in browser
- **SSR (Server-Side Rendering)** - `/ssr` - HTML generated on server per request  
- **SSG (Static Site Generation)** - `/ssg` - HTML pre-built at build time
- **ISR (Incremental Static Regeneration)** - `/isr` - Static pages with background updates

### Quick Start
1. Development server is running at http://localhost:3000
2. Navigate through different rendering examples
3. Compare performance and behavior of each approach

### Key Features
- Interactive examples with real API data
- Performance comparisons and use case guidance
- TypeScript implementation with modern React patterns
- Responsive design with Tailwind CSS
