// "use client"
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import {
//   RegisterLink,
//   LoginLink,
// } from "@kinde-oss/kinde-auth-nextjs/components";
// import { redirect } from "next/navigation";
// import { useEffect } from "react";



// export default function Home() {

//   useEffect(() => {
//     redirect('/api/auth/login?post_login_redirect_url=/dashboard')
//   },[])
//   return (
//     <div>
//       Sri Veerabhadreshwara Swamy
//       <p> Jai Hanuman </p>
//       <Button>Namaste</Button>
    
//     </div>
//   );
// }
"use client"; // Ensure this is the first line

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard'); // Using replace instead of push for instant redirect
  }, [router]);

  return (
    <div>
      <p>Redirecting to dashboard...</p>
    </div>
  );
};

export default Home;


