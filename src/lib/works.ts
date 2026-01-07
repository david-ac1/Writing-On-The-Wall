import { Document } from '@/types';

// This is the content manifest - add your documents here
export const works: Document[] = [
  // Systems (Tech)
  {
    id: 'rust-memory-safety',
    title: 'Memory Safety as Economics',
    category: 'Systems',
    coverImage: 'animated',
    filePath: '/systems/Memory Safety as Economics_ Rust Ownership for Low-Resource Systems.pdf',
    description: 'Rust Ownership for Low-Resource Systems',
    type: 'pdf',
  },
  {
    id: 'gemini-optimization',
    title: 'Optimizing Gemini 3 Multimodal Prompts',
    category: 'Systems',
    coverImage: 'animated',
    filePath: '/systems/Optimizing Gemini 3 Multimodal Prompts for Low-Bandwidth.pdf',
    description: 'Multimodal Prompts for Low-Bandwidth',
    type: 'pdf',
  },
  {
    id: 'health-tech-architecture',
    title: 'Why Most Health-Tech Architectures Fail',
    category: 'Systems',
    coverImage: 'animated',
    filePath: '/systems/Why Most Health-Tech Architectures Fail the Policy Test (and What I\'D Do Instead).pdf',
    description: 'The Policy Test and What To Do Instead',
    type: 'pdf',
  },
  
  // Sovereignty (Policy)
  {
    id: 'sustainability-competition',
    title: 'Competition in Sustainability',
    category: 'Sovereignty',
    coverImage: 'animated',
    filePath: '/sovereignty/David Achibiri_Loyola Jesuit College_competition in sustainability and corporate responsibility.pdf',
    description: 'Sustainability and Corporate Responsibility',
    type: 'pdf',
  },
  {
    id: 'health-economics-africa',
    title: 'Health Economics For Africa Summit',
    category: 'Sovereignty',
    coverImage: 'animated',
    filePath: '/sovereignty/Health-Economics-For-Africa-Summit.pdf',
    description: 'Policy frameworks for African healthcare',
    type: 'pdf',
  },
  {
    id: 'akinwade-foundation',
    title: 'Olusoji Akinwade Development Foundation',
    category: 'Sovereignty',
    coverImage: 'animated',
    filePath: '/sovereignty/THE OLUSOJI AKINWADE DEVELOPMENT FOUNDATION ESSAY COMPETITION.pdf',
    description: 'Essay on development and social change',
    type: 'pdf',
  },
  
  // Witness (Poetry/Narrative)
  {
    id: 'shot-glass',
    title: 'A Shot Glass Is The Fullness Of Emptiness',
    category: 'Witness',
    coverImage: 'animated',
    filePath: '/witness/A Shot Glass Is The Fullness Of Emptiness.pdf',
    description: 'Poetry on paradox and presence',
    type: 'pdf',
  },
  {
    id: 'after-the-end',
    title: 'After The End',
    category: 'Witness',
    coverImage: 'animated',
    filePath: '/witness/AFTER THE END POETRY COMPETITION 2025.pdf',
    description: 'Poetry competition entry 2025',
    type: 'pdf',
  },
  {
    id: 'climate-future-leaders',
    title: 'Climate Cardinals Future Leaders',
    category: 'Witness',
    coverImage: 'animated',
    filePath: '/witness/Climate Cardinals x ChallengeUS Future Leaders Competition Winter 2025.pdf',
    description: 'Climate action and leadership',
    type: 'pdf',
  },
  {
    id: 'eulogy-straight-man',
    title: 'Eulogy For A Straight Man',
    category: 'Witness',
    coverImage: 'animated',
    filePath: '/witness/Eulogy For A Straight Man (4).pdf',
    description: 'A narrative exploration of identity',
    type: 'pdf',
  },
  {
    id: 'evaristo-poetry',
    title: 'Evaristo Poetry Prize',
    category: 'Witness',
    coverImage: 'animated',
    filePath: '/witness/EVARISTO POETRY PRIZE FOR AFRICAN WRITERS 2025 (2).pdf',
    description: 'African poetry competition entry',
    type: 'pdf',
  },
  {
    id: 'martini',
    title: 'Martini',
    category: 'Witness',
    coverImage: 'animated',
    filePath: '/witness/MARTINI.pdf',
    description: 'Narrative poetry',
    type: 'pdf',
  },
  {
    id: 'prince-thousand-enemies',
    title: 'Prince With A Thousand Enemies',
    category: 'Witness',
    coverImage: 'animated',
    filePath: '/witness/Prince With A Thousand Enemies.pdf',
    description: 'Epic narrative poem',
    type: 'pdf',
  },
];

export const getCategoryWorks = (category: Document['category']) => {
  return works.filter(work => work.category === category);
};

export const getWorkById = (id: string) => {
  return works.find(work => work.id === id);
};
