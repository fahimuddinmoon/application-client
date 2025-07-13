"use client";
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function Privateroute({ children }) {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !isAuthorized) {
    return (
      <div className='min-h-screen grid place-content-center'>
        <h2>Loading.......</h2>
      </div>
    );
  }

  return children;
}
