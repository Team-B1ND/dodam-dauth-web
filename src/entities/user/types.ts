export interface UserProfile {
  publicId: string;
  username: string;
  name: string;
  phone: string | null;
  profileImage: string | null;
  status: string;
  roles: string[];
  student: { grade: number; room: number; number: number } | null;
  teacher: { position: string } | null;
  createdAt: string;
}
