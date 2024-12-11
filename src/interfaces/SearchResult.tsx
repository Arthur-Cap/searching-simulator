export interface SearchResult {
    TotalNumberOfResults: number;
    Page: number;
    PageSize: number;
    ResultItems: DocumentItem[];
  }
  
  export interface DocumentItem {
    DocumentId: string;
    DocumentTitle: HighlightedText;
    DocumentExcerpt: HighlightedText;
    DocumentURI: string;
    Id?: string; 
    Type?: string;
  }
  
  export interface HighlightedText {
    Text: string;
    Highlights: Highlight[];
  }
  
  export interface Highlight {
    BeginOffset: number;
    EndOffset: number;
  }
  