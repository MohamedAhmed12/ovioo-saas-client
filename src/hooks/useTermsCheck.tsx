import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useTermsCheck = () => {
  const router = useRouter();
  const userHasAgreed = /* Logic to determine if the user has agreed to the terms */;

  useEffect(() => {
    if (!userHasAgreed) {
      router.push('/terms');
    }
  }, [userHasAgreed, router]);
};

export default useTermsCheck;
