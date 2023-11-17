// Imports
// ========================================================
import { UUID } from "crypto";
import {
  ColumnType,
  Generated,
} from "kysely";

// Table Types
// ========================================================
interface Users {
  id: Generated<UUID>;
  email: string;
  createdAt: ColumnType<Date, string | undefined, never>
}

interface Todos {
  id: Generated<UUID>;
  userId: Generated<UUID>;
  todo: string;
  isComplete?: boolean;
  createdAt: ColumnType<Date, string | undefined, never>
}

// Types
// ========================================================
export interface Database {
  users: Users,
  todos: Todos
}
