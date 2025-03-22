export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
  };
  subregion?: string;
  tld?: string[];
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  borders?: string[];
}
