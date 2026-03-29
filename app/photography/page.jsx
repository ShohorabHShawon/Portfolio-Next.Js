'use client';
import PinterestPhotographyTheme from './themes/pinterest-theme/PinterestPhotographyTheme';
import VintagePhotographyTheme from './themes/vintage-theme/VintagePhotographyTheme';

const ACTIVE_THEME = 'pinterest';

const themeMap = {
  pinterest: PinterestPhotographyTheme,
  vintage: VintagePhotographyTheme,
};

export default function Photography() {
  const ActiveTheme = themeMap[ACTIVE_THEME] || VintagePhotographyTheme;
  return <ActiveTheme />;
}
