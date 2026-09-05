/**
 * Database Connection & Credentials Configuration
 * Reads credentials strictly from process.env. Zero hardcoded secrets!
 */

export interface DBConfig {
  databaseUrl: string;
  maxPoolSize: number;
  connectionTimeoutMs: number;
}

export const getDBConfig = (): DBConfig => {
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://localhost:5432/careconnect_db';

  return {
    databaseUrl,
    maxPoolSize: Number(process.env.DB_MAX_POOL) || 10,
    connectionTimeoutMs: 5000,
  };
};
