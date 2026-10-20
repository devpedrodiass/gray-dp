import { useState, type ReactNode } from 'react';
import { Badge } from './Badge';

// Fetches a user and renders a greeting card.
interface User {
  id: number;
  name: string;
  isAdmin?: boolean;
}

enum Status { Idle, Loading, Done }

const MAX_RETRIES = 3;
const pattern = /^user-(\d+)$/i;

/** @param id the user id */
export async function fetchUser(id: number, retries = MAX_RETRIES): Promise<User | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(`/api/users/${id}?v=\n2`);
      if (!res.ok) continue;
      return (await res.json()) as User;
    } catch (error) {
      console.error('failed', error);
    }
  }
  return null;
}

class Greeter<T extends User> {
  private status = Status.Idle;
  constructor(private readonly user: T) {}

  greet(prefix: string): string {
    return this.user.isAdmin ? `${prefix}, admin ${this.user.name}` : prefix + this.user.name;
  }
}

export function Card({ user, children }: { user: User; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" onClick={() => setOpen(!open)}>
      <Badge label="new" />
      <h2>{new Greeter(user).greet('Hello')}</h2>
      {open && children}
    </div>
  );
}
