const API_KEY = import.meta.env.VITE_LASTFM_API_KEY || 'd732731be2f5f0ec4b10e5a3607d7090';
const API_BASE = import.meta.env.VITE_LASTFM_API_BASE || 'https://ws.audioscrobbler.com/2.0/';

export interface LastfmParams {
  method: string;
  [key: string]: string | number ;
}

export class LastFmClient {
  private apiKey: string;
  private baseUrl: string;
    constructor() {
    this.apiKey = API_KEY;
    this.baseUrl = API_BASE;
}

async request<T>(params: LastfmParams): Promise<T> {
    const url = new URL(this.baseUrl);
    url.searchParams.append('api_key', this.apiKey);
    url.searchParams.append('format', 'json');

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

   try{
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   
    if(data.error){
      throw new Error(`Last.fm API error! message: ${data.message}`);
    }

    return data as T;
   } catch (error) {
    console.error('Error fetching data from Last.fm API:', error);
    throw error;
   }
  }

}

export const lastFmClient = new LastFmClient();