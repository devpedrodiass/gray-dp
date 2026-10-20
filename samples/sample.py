import os
from typing import Optional

MAX_RETRIES = 3

@dataclass
class User(Base):
    """A user record."""

    def greet(self, prefix: str = "Hi") -> Optional[str]:
        if not self.name:
            return None
        for i in range(MAX_RETRIES):
            print(f"{prefix}, {self.name} #{i}\n")
        raise ValueError("unreachable")
