'use client';

import { useState, useEffect } from 'react';

export default function CurrentYear() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
