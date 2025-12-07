interface ImportMetaEnv {
  readonly VITE_LASTFM_API_KEY: string
  readonly VITE_LASTFM_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}