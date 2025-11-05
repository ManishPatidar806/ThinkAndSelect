# ThinkAndSelect Frontend - AI Coding Assistant Guidelines

## Project Overview
This is a React/Vite-based educational platform for programming quizzes, tutorials, and code practice. The app features token-based authentication, quiz systems with practice/certification modes, an integrated code compiler, and educational resource management.

## Architecture & Key Patterns

### Authentication & Route Protection
- **Token-based auth**: Uses localStorage for JWT token (`Bearer ${token}`)
- **Route guarding**: `App.jsx` conditionally renders authenticated routes based on `localStorage.getItem("token")`
- **Back navigation prevention**: `Prevent.jsx` component blocks browser back button using `history.pushState`
- **User data persistence**: Stores `fullname`, `domain`, `place`, `description` in localStorage

```jsx
// Critical auth pattern - all protected routes wrapped in token check
{token != null ? (
  <>
    <Route path="/home" element={[<Home />]} />
    // ... other protected routes
  </>
) : (
  <Route path="/*" element={<NotFound />} />
)}
```

### Data Management Patterns
- **Static data collections**: Centralized in `src/Page/data/` (QuizData.jsx, NotesData.jsx, TutorialData.jsx, Constains.js)
- **API integration**: Uses environment variable `VITE_API_URL` for backend endpoints
- **State management**: Pure React hooks (no Redux) - local component state with useState

### Component Structure & Conventions
- **Page-based organization**: All main views in `src/Page/[Feature]/` directories
- **Shared UI**: Shadcn/UI components in `src/components/ui/` with CVA variants
- **Layout pattern**: Most pages include `<Navbar />` component with consistent styling
- **Loading states**: Dedicated Loading components with spinner animations

## Key Development Workflows

### Building & Development
```bash
npm run dev      # Vite dev server on port 3000
npm run build    # Builds to ./build/ directory (not dist/)
npm run preview  # Preview production build
npm run lint     # ESLint with React plugins
```

### Styling System
- **Tailwind + Shadcn/UI**: Uses CSS variables for theming (see `src/index.css`)
- **Consistent color scheme**: Purple primary (`#9333EA`), light backgrounds (`#EEF2FF`)
- **Responsive design**: Mobile-first with hamburger menu in Navbar component
- **Glass morphism effects**: `.glass` class for backdrop-blur components

## Critical Integration Points

### Monaco Code Editor (Compiler Feature)
- **Language selection**: Managed via `LANGUAGE_VERSIONS` array in `Constains.js`
- **Code execution**: External API (`https://emkc.org/api/v2/piston/execute`)
- **Template system**: `CODE_SNIPPETS` object provides language-specific starter code
- **Version management**: Stores language version in localStorage for API calls

### Quiz System Architecture
- **Dual quiz modes**: Practice (10 questions) vs Certification (20 questions, 80% pass)
- **Question flow**: Sequential with radio button selection, immediate submission
- **Scoring logic**: Real-time score calculation, percentage-based pass/fail
- **Results routing**: `/result` (practice), `/exampassed` or `/failed` (certification)

### External Resource Management
- **Cloudinary integration**: All images served from `res.cloudinary.com/dgmsfmeaz`
- **Google Drive links**: PDF notes and resources stored on Google Drive
- **YouTube playlists**: Tutorial links point to curated educational content

## Project-Specific Conventions

### File Naming & Structure
- **Page components**: PascalCase in feature folders (e.g., `Dashboard/Dashboard.jsx`)
- **Data files**: Descriptive names with `.jsx` extension even for pure data
- **Route paths**: Lowercase with hyphens (e.g., `/practicequiz`, `/certificationquiz`)

### State Management Patterns
```jsx
// Quiz state pattern - used across quiz components
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [marks, setMarks] = useState(0);
const [checked, setChecked] = useState(null);
```

### Error Handling & Loading
- **Loading states**: Component-level loading with `MainLoading` for auth flows
- **Error boundaries**: Basic try-catch with user-friendly messages
- **Network resilience**: Graceful degradation when API calls fail

### Environment Configuration
- **Development**: Uses `VITE_API_URL` from `.env`
- **Production**: Vercel deployment with SPA routing via `vercel.json`
- **Build output**: Custom `outDir: "build"` instead of default `dist`

## Development Best Practices

### Component Patterns
- Always include `<Prevent />` for authenticated pages requiring back-button protection
- Use `useNavigate()` hook for programmatic navigation, never direct window manipulation
- Implement loading states for all async operations (API calls, file operations)
- Follow the established localStorage pattern for user data persistence

### Styling Guidelines
- Use Tailwind utility classes with established color palette
- Prefer responsive design with `md:` prefixes for desktop layouts
- Apply consistent spacing with standardized margin/padding classes
- Utilize Shadcn/UI components for form elements and interactive components

### Data Flow Conventions
- Store quiz selection state in localStorage (`type`, `marks`, `percentage`)
- Use environment variables for all external API endpoints
- Maintain data consistency between static collections and dynamic API responses

When working with this codebase, prioritize understanding the authentication flow, quiz state management, and the integration between the Monaco editor and external code execution service. The app's architecture is straightforward but relies heavily on localStorage for state persistence and has specific patterns for handling educational content delivery.