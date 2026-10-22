import { pageMetadata } from '@/lib/site';
import DevPortfolioClient from './DevPortfolioClient';

export const metadata = pageMetadata({
  title: 'Software Developer Portfolio',
  description:
    'Software developer portfolio of Shohorab H Shawon (Shohorab Hossain Shawon), a CSE graduate of American International University-Bangladesh (AIUB): web apps, UI projects and skills.',
  path: '/dev',
});

export default function DevPage() {
  return <DevPortfolioClient />;
}
