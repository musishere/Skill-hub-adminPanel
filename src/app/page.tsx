import { redirect } from "next/navigation";
import { UserIcon, CheckCircleIcon, AcademicCapIcon, UserGroupIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
export default function Home() {
  // Redirect to /users page
  redirect("/users");
}
