'use client';

import { useState, useEffect } from 'react';

export default function FormattedDate({ date }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(
      new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    );
  }, [date]);

  return <span className="flex items-center">📅 {formattedDate}</span>;
}
