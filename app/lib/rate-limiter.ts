interface RateLimiter {
  timestamp: number;
  count: number;
}

const rateLimitMap = new Map<string, RateLimiter>();
const GLOBAL_KEY = 'global_rate_limit';

export function isRateLimited(limitDuration: number = 5000): { limited: boolean; remainingTime: number } {
  const now = Date.now();
  const limiter = rateLimitMap.get(GLOBAL_KEY);

  if (!limiter) {
    rateLimitMap.set(GLOBAL_KEY, { timestamp: now, count: 1 });
    return { limited: false, remainingTime: 0 };
  }

  const timeDiff = now - limiter.timestamp;
  
  if (timeDiff < limitDuration) {
    return { 
      limited: true, 
      remainingTime: Math.ceil((limitDuration - timeDiff) / 1000)
    };
  }

  rateLimitMap.set(GLOBAL_KEY, { timestamp: now, count: 1 });
  return { limited: false, remainingTime: 0 };
}
