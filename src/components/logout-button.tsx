"use client";

import { signOut } from "@/app/actions";

export default function LogoutButton() {
  return <button onClick={() => signOut()}>Logout</button>;
}
