import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes/routes";

export default function Admin() {
  redirect("/admin/dashboard");
}
