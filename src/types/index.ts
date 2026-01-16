export type Category = 'Systems' | 'Sovereignty' | 'Witness';

export interface Document {
  id: string;
  title: string;
  category: Category;
  coverImage: string;
  filePath: string;
  description?: string;
  date?: string;
  type: 'pdf' | 'markdown';
  rotation?: 90 | 180 | 270;
}

export interface DocumentManifest {
  documents: Document[];
}
