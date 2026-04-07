"""
HealthSathi — In-Memory Sliding Window Rate Limiter
Per-IP rate limiting without Redis. Tracks requests in memory.
"""

import time
import os
from collections import defaultdict
from typing import Tuple

RPM_LIMIT = int(os.getenv("RATE_LIMIT_RPM", "15"))
RPD_LIMIT = int(os.getenv("RATE_LIMIT_RPD", "200"))


class RateLimiter:
    """Sliding window rate limiter per client IP."""

    def __init__(self, rpm: int = RPM_LIMIT, rpd: int = RPD_LIMIT):
        self.rpm = rpm
        self.rpd = rpd
        # {ip: [timestamp, timestamp, ...]}
        self._minute_windows: dict[str, list[float]] = defaultdict(list)
        self._day_windows: dict[str, list[float]] = defaultdict(list)

    def _cleanup(self, timestamps: list[float], window_seconds: int) -> list[float]:
        """Remove timestamps outside the sliding window."""
        cutoff = time.time() - window_seconds
        return [ts for ts in timestamps if ts > cutoff]

    def check(self, client_ip: str) -> Tuple[bool, dict]:
        """
        Check if a request from this IP is allowed.
        Returns (allowed: bool, info: dict with remaining counts and retry_after)
        """
        now = time.time()

        # Clean up old entries
        self._minute_windows[client_ip] = self._cleanup(
            self._minute_windows[client_ip], 60
        )
        self._day_windows[client_ip] = self._cleanup(
            self._day_windows[client_ip], 86400
        )

        minute_count = len(self._minute_windows[client_ip])
        day_count = len(self._day_windows[client_ip])

        # Check minute limit
        if minute_count >= self.rpm:
            oldest = self._minute_windows[client_ip][0]
            retry_after = int(60 - (now - oldest)) + 1
            return False, {
                "reason": "minute_limit",
                "limit": self.rpm,
                "remaining": 0,
                "retry_after": max(retry_after, 1),
            }

        # Check daily limit
        if day_count >= self.rpd:
            oldest = self._day_windows[client_ip][0]
            retry_after = int(86400 - (now - oldest)) + 1
            return False, {
                "reason": "daily_limit",
                "limit": self.rpd,
                "remaining": 0,
                "retry_after": max(retry_after, 1),
            }

        # Allowed — record this request
        self._minute_windows[client_ip].append(now)
        self._day_windows[client_ip].append(now)

        return True, {
            "rpm_remaining": self.rpm - minute_count - 1,
            "rpd_remaining": self.rpd - day_count - 1,
        }


# Singleton instance
rate_limiter = RateLimiter()
