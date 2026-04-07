"""
HealthSathi — In-Memory TTL Cache with LRU Eviction
No Redis needed. Simple dict-based cache for symptom responses.
"""

import hashlib
import time
import os
from collections import OrderedDict
from typing import Any, Optional

MAX_SIZE = int(os.getenv("CACHE_MAX_SIZE", "1000"))
TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", "3600"))  # 1 hour default


class SymptomCache:
    """Thread-safe-ish LRU cache with TTL expiration."""

    def __init__(self, max_size: int = MAX_SIZE, ttl: int = TTL_SECONDS):
        self.max_size = max_size
        self.ttl = ttl
        self._store: OrderedDict[str, dict] = OrderedDict()
        self._stats = {"hits": 0, "misses": 0, "sets": 0, "evictions": 0}

    @staticmethod
    def make_key(symptom_text: str, region: str, is_hindi: bool) -> str:
        """Generate a deterministic cache key from symptom inputs."""
        normalized = f"{symptom_text.strip().lower()}|{(region or '').strip().lower()}|{is_hindi}"
        return hashlib.sha256(normalized.encode("utf-8")).hexdigest()[:16]

    def get(self, key: str) -> Optional[Any]:
        """Get from cache. Returns None if miss or expired."""
        if key not in self._store:
            self._stats["misses"] += 1
            return None

        entry = self._store[key]
        # Check TTL
        if time.time() - entry["ts"] > self.ttl:
            del self._store[key]
            self._stats["misses"] += 1
            return None

        # Move to end (most recently used)
        self._store.move_to_end(key)
        self._stats["hits"] += 1
        return entry["data"]

    def set(self, key: str, data: Any) -> None:
        """Store in cache with LRU eviction."""
        # Evict oldest if at capacity
        while len(self._store) >= self.max_size:
            self._store.popitem(last=False)
            self._stats["evictions"] += 1

        self._store[key] = {"data": data, "ts": time.time()}
        self._store.move_to_end(key)
        self._stats["sets"] += 1

    def get_stats(self) -> dict:
        """Return cache statistics."""
        total = self._stats["hits"] + self._stats["misses"]
        hit_rate = (self._stats["hits"] / total * 100) if total > 0 else 0
        return {
            **self._stats,
            "size": len(self._store),
            "hit_rate_pct": round(hit_rate, 1),
        }


# Singleton instance
symptom_cache = SymptomCache()
