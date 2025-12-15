export function isDemoMode(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEMO === 'true';
}

export function getDemoNow(): Date {
  // Return current time for demo mode, or allow override via environment
  const demoTime = process.env.NEXT_PUBLIC_DEMO_TIME;
  return demoTime ? new Date(demoTime) : new Date();
}
