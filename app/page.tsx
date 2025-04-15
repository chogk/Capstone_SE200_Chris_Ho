import { redirect } from 'next/navigation';

export default function ReDirectPage() {
  if (true) {
    redirect('/login'); // Redirect to the /login page
  }
  return null;
}