import { MemberInterface } from "@/types/member";

export const members: MemberInterface[] = [
  {
    id: "1e2d3f4g-5h6i-7j8k-9l0m-n1o2p3q4r5s6", // Example UUID
    avatar: {
      id: "1e2d3f4g-5h6i-7j8k-9l0m-n1o2p3q4r5s6", // Example UUID for the avatar
      href: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "women/44.jpg",
    },
    fullName: "Zoe Martin",
    role: {
      id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6", // Example UUID for the role
      name: "Data Scientist",
    },
  },
  {
    id: "7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p",
    avatar: {
      id: "7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p", // Example UUID for the avatar
      href: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "men/45.jpg",
    },
    fullName: "Ethan Walker",
    role: {
      id: "b1c2d3e4-f5g6-7h8i-9j0k-l1m2n3o4p5q6",
      name: "Web Developer",
    },
  },
  {
    id: "3q4r5s6t-7u8v-9w0x-1y2z-3a4b5c6d7e8f",
    avatar: {
      id: "3q4r5s6t-7u8v-9w0x-1y2z-3a4b5c6d7e8f", // Example UUID for the avatar
      href: "https://randomuser.me/api/portraits/women/46.jpg",
      name: "women/46.jpg",
    },
    fullName: "Olivia Smith",
    role: {
      id: "c1d2e3f4-g5h6-7i8j-9k0l-m1n2o3p4q5r6",
      name: "UX Designer",
    },
  },
  {
    id: "9a0b1c2d-3e4f-5g6h-7i8j-9k0l1m2n3o4p",
    avatar: {
      id: "9a0b1c2d-3e4f-5g6h-7i8j-9k0l1m2n3o4p", // Example UUID for the avatar
      href: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "men/47.jpg",
    },
    fullName: "Lucas Taylor",
    role: {
      id: "d1e2f3g4-h5i6-7j8k-9l0m-n1o2p3q4r5s6",
      name: "Product Manager",
    },
  },
];

const [member1, member2, member3, member4] = members;
export { member1, member2, member3, member4 };
