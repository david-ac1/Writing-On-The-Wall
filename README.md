# Writing on the Wall

> **ÈBỤKÀ'S digital archive** — A portfolio of technical explorations, policy frameworks, and narrative work.

A minimalist, immersive digital archive built with Next.js. This project presents a gallery-style document browser where each work opens in an elegant in-site PDF viewer with Nsibidi-inspired geometric patterns subtly marking the background.

---

## ✨ Features

### Document Organization
- **Systems**: Technical explorations (Rust, AI optimization, health-tech architecture)
- **Sovereignty**: Policy frameworks and development (sustainability, healthcare economics)
- **Witness**: Poetry, narrative, and human experience

### User Experience
- **PDF-as-Cover**: First page of each document automatically displays as the cover
- **Interactive Cards**: 3D hover effects powered by Framer Motion
- **Enhanced PDF Viewer**: Modal viewer with zoom (50%-250%), fullscreen mode, and keyboard navigation
- **Accessibility**: WCAG compliant with ARIA labels, keyboard shortcuts, and screen reader support
- **Cultural Background**: Fixed Afro-geometric patterns in beige and royal blue
- **Music Footer**: Personal music collection appears when scrolling to page end

### Technical Highlights
- **Flat-File Architecture**: All content managed through simple TypeScript manifests
- **Typography**: Georgia serif for signature, Playfair Display for headings, JetBrains Mono for code
- **Performance**: Next.js 16 with App Router, optimized PDF rendering with caching
- **Type-Safe**: Full TypeScript implementation
- **A11y Compliant**: Keyboard navigation (Arrow keys, F for fullscreen, Escape to close)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/writing-on-the-wall.git
cd writing-on-the-wall

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 📁 Project Structure

```
writing-on-the-wall/
├── public/
│   ├── systems/           # Systems category PDFs
│   ├── sovereignty/       # Sovereignty category PDFs
│   ├── witness/           # Witness category PDFs
│   ├── covers/            # Music album artwork (JPG)
│   └── document-covers/   # [Optional] Custom document cover images
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout with metadata
│   │   ├── page.tsx       # Home page with state management
│   │   └── globals.css    # Global styles + Nsibidi pattern background
│   ├── components/
│   │   ├── Bookshelf.tsx        # Main gallery with category filters
│   │   ├── DocumentCard.tsx     # Document cards with PDF preview
│   │   ├── PDFPreview.tsx       # Optimized first-page preview component
│   │   ├── FlipbookViewer.tsx   # Modal PDF viewer overlay
│   │   ├── PDFViewer.tsx        # Enhanced PDF viewer with zoom & fullscreen
│   │   └── MusicFooter.tsx      # Bottom music collection
│   ├── lib/
│   │   ├── works.ts       # Document manifest (13 works)
│   │   └── music.ts       # Music collection manifest (10 songs)
│   └── types/
│       └── index.ts       # TypeScript interfaces
```

---

## 📝 Adding Content

### Add a New Document

1. **Place PDF in category folder:**
   ```
   public/systems/your-new-work.pdf
   ```

2. **Update the manifest** in `src/lib/works.ts`:
   ```typescript
   {
     id: 'your-work-id',
     title: 'Your Work Title',
     category: 'Systems', // or 'Sovereignty' or 'Witness'
     coverImage: '/document-covers/your-work-id.jpg', // Optional custom cover
     filePath: '/systems/your-new-work.pdf',
     description: 'Brief description shown on hover',
     type: 'pdf',
   }
   ```

3. **[Optional] Add custom cover:**
   - By default, the first page of the PDF displays as the cover
   - To use a custom image: place JPG in `public/document-covers/`

### Add Music to Footer

Edit `src/lib/music.ts`:
```typescript
{
  title: "Song Title",
  artist: "Artist Name",
  cover: "/covers/song-filename.jpg",
  spotify: "https://open.spotify.com/track/...",
  apple: "https://music.apple.com/..."
}
```

Place album artwork (56×56px recommended) in `public/covers/`.

---

## 🎨 Design System

### Colors
- **Background**: `#F9F9F9` (Gallery White)
- **Text**: `#1A1A1A` (Deep Slate)
- **Patterns**: Beige (`#F5F5DC`) and Royal Blue (`#4169E1`)

### Typography
- **Signature**: Georgia serif with wide letter-spacing
- **Headings**: Playfair Display (serif)
- **Body/Code**: JetBrains Mono (monospace)

### Cultural Elements
- **Nsibidi-Inspired Patterns**: Subtle Afro-geometric symbols (Uli curves, concentric circles, cross-hatches) repeat as a fixed background watermark

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| PDF Rendering | react-pdf + pdfjs-dist |
| Icons | Lucide React |
| Language | TypeScript |
| Fonts | Google Fonts (Playfair Display, JetBrains Mono) |

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

**Alternative platforms:** Netlify, Cloudflare Pages, or any Node.js hosting service.

---

## 🎯 Design Philosophy

- **Content First**: Documents are the hero, UI stays minimal
- **Cultural Identity**: Nsibidi patterns honor African design heritage
- **Physical Feel**: Cards with depth, realistic hover interactions
- **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation and ARIA support
- **Fast & Responsive**: Optimized PDF loading with progressive rendering
- **No Bloat**: Direct file structure, no CMS complexity

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` / `→` | Navigate PDF pages |
| `F` | Toggle fullscreen mode |
| `Escape` | Close PDF viewer |
| `Tab` | Navigate between controls |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Nsibidi and Uli art traditions for pattern inspiration
- Music artists featured in the footer collection
- Next.js and Vercel teams for the excellent framework

---

**Built with intention by Èbụkà** • [Portfolio](https://your-site.com) • [GitHub](https://github.com/yourusername)
