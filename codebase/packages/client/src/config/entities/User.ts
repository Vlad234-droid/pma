enum Status {
  PENDING = 'pending',
  ACTIVE = 'active',
  LOCKED = 'locked',
}

enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export { Role, Status };

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  status: Status;
  role: Role;
}
