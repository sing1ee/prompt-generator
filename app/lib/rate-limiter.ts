interface RateLimiter {
  timestamp: number;
  count: number;
}

const rateLimitMap = new Map<string, RateLimiter>();

export function isRateLimited(identifier: string, limitDuration: number = 5000): { limited: boolean; remainingTime: number } {
  const now = Date.now();
  const limiter = rateLimitMap.get(identifier);

  if (!limiter) {
    rateLimitMap.set(identifier, { timestamp: now, count: 1 });
    return { limited: false, remainingTime: 0 };
  }

  const timeDiff = now - limiter.timestamp;
  
  if (timeDiff < limitDuration) {
    return { 
      limited: true, 
      remainingTime: Math.ceil((limitDuration - timeDiff) / 1000)
    };
  }

  rateLimitMap.set(identifier, { timestamp: now, count: 1 });
  return { limited: false, remainingTime: 0 };
}