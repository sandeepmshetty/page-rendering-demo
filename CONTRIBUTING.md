# Contributing to Page Rendering Demo

Thank you for your interest in contributing to this project! This guide will help you get started.

## 🎯 Project Goals

This project aims to:
- Demonstrate different page rendering strategies with practical examples
- Provide educational content about performance implications
- Show real-world implementation patterns in Next.js 14
- Help developers make informed decisions about rendering approaches

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Setup Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/page-rendering-demo.git
   cd page-rendering-demo
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 📝 How to Contribute

### Reporting Issues
- Use the [GitHub Issues](https://github.com/sandeepmshetty/page-rendering-demo/issues) page
- Search existing issues before creating a new one
- Provide clear reproduction steps
- Include browser/environment information

### Suggesting Enhancements
- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Explain how it aligns with project goals

### Code Contributions

#### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code improvements

#### Making Changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow coding standards**:
   - Use TypeScript for type safety
   - Follow existing code formatting
   - Add comments for complex logic
   - Use meaningful variable/function names

3. **Test your changes**:
   - Test all rendering methods (CSR, SSR, SSG, ISR)
   - Verify responsive design works
   - Check performance implications
   - Ensure no console errors

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new performance metric visualization"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changes were made and why
   - Include screenshots if applicable

## 🎨 Style Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing indentation (2 spaces)
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

### Component Structure
```typescript
// Good component structure example
interface ComponentProps {
  // Define props with clear types
}

export default function Component({ prop }: ComponentProps) {
  // Component logic
  
  return (
    <div className="semantic-class-names">
      {/* Clear JSX structure */}
    </div>
  );
}
```

### CSS/Styling
- Use Tailwind CSS classes for styling
- Create custom CSS only when Tailwind isn't sufficient
- Follow responsive design principles
- Maintain consistent color scheme

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] All rendering methods work correctly
- [ ] Navigation between pages is smooth
- [ ] Performance metrics display properly
- [ ] Responsive design works on mobile/tablet
- [ ] No console errors or warnings
- [ ] Content is readable and accessible

### Performance Testing
- Check Web Vitals metrics
- Verify bundle sizes aren't significantly increased
- Test on different network conditions
- Ensure rendering strategies demonstrate their characteristics

## 📚 Documentation

### When to Update Documentation
- Adding new features or rendering examples
- Changing existing behavior
- Adding new configuration options
- Fixing unclear instructions

### Documentation Standards
- Use clear, simple language
- Include code examples
- Add screenshots for visual features
- Update README.md for significant changes

## 🏷️ Commit Message Convention

Use conventional commits format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests

Examples:
```
feat: add bundle size visualization to CSR page
fix: resolve ISR cache status display issue
docs: update README with new performance metrics
refactor: simplify navigation component logic
```

## 🎯 Areas for Contribution

### High Priority
- Performance metric improvements
- Better mobile responsive design
- Accessibility enhancements
- Additional educational content

### Medium Priority
- New rendering strategy examples
- Performance optimization
- Code quality improvements
- Better error handling

### Low Priority
- UI/UX enhancements
- Additional animations
- Extended documentation
- Internationalization

## ❓ Getting Help

- **Questions?** Open a [GitHub Discussion](https://github.com/sandeepmshetty/page-rendering-demo/discussions)
- **Stuck?** Check existing issues or create a new one
- **Want to chat?** Tag [@sandeepmshetty](https://github.com/sandeepmshetty) in discussions

## 🙏 Recognition

All contributors will be recognized in the project. Significant contributions may be highlighted in the README.

Thank you for helping make this educational resource better for everyone! 🚀
