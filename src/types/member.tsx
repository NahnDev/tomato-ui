import { FileInterface } from "./file";
import { RoleInterface } from "./role";

export interface MemberInterface {
  id: string;
  avatar: FileInterface;
  fullName: string;
  role: RoleInterface;
}
