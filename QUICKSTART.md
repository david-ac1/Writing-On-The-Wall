## Quick Start Checklist

### 1. ✅ Project Setup (DONE)
- [x] Next.js 16 with TypeScript
- [x] Tailwind CSS configured
- [x] All dependencies installed
- [x] Component structure created

### 2. 📄 Add Your Content

#### Step 1: Add PDFs
Place your PDF files in:
```
public/assets/docs/your-document.pdf
```

#### Step 2: Add Cover Images  
Place cover images (400x600px recommended) in:
```
public/assets/covers/your-cover.svg
```

#### Step 3: Update Manifest
Edit `src/lib/works.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Your Title',
  category: 'Systems', // or 'Sovereignty' or 'Witness'
  coverImage: '/assets/covers/your-cover.svg',
  filePath: '/assets/docs/your-document.pdf',
  description: 'Short description',
  type: 'pdf',
}
```

### 3. 🚀 Run & Deploy

#### Development:
```bash
npm run dev
```
Visit: http://localhost:3000

#### Production Build:
```bash
npm run build
npm start
```

#### Deploy to Vercel:
```bash
vercel
```

---

## Category Descriptions

- **Systems**: Technical explorations, proof of work (Gemini, Rust deep dives)
- **Sovereignty**: Policy frameworks, digital autonomy papers
- **Witness**: Poetry, narrative, emotional/academic pieces (Eulogy)

## Current Placeholder Files

Replace these with your actual content:
- `/public/assets/covers/gemini-placeholder.svg`
- `/public/assets/covers/rust-placeholder.svg`
- `/public/assets/covers/sovereignty-placeholder.svg`
- `/public/assets/covers/eulogy-placeholder.svg`

Add PDFs to: `/public/assets/docs/`
