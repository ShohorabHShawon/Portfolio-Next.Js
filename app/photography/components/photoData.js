import photoDimensions from './photoDimensions.json';

const rawPhotos = [
    {
    src: '/images/web/photo12.jpg',
    title: 'Path of Whispering Shadows',
    category: 'Street',
  },
  {
    src: '/images/web/photo19.jpg',
    title: 'Citrus Jewel, Effervescent Dance',
    category: 'Conceptual',
  },
  {
    src: '/images/web/photo10.jpg',
    title: 'Skyward Fire, Petal & Plume',
    category: 'Flower',
  },
  {
    src: '/images/web/photo6.jpg',
    title: 'Cat Silhouette Against the Full Moon',
    category: 'Conceptual',
  },
  {
    src: '/images/web/photo4.jpg',
    title: 'Rickshaw Ride Under Bougainvillea',
    category: 'Urban',
  },
    {
    src: '/images/web/photo7.jpg',
    title: 'Dreams and Weight',
    category: 'Street',
  },
  {
    src: '/images/web/photo5.jpg',
    title: 'Cycling Past Bougainvillea',
    category: 'Street',
  },


  {
    src: '/images/web/photo8.jpg',
    title: 'Sunset Hues & Fleeting Joys',
    category: 'Street',
  },
  {
    src: '/images/web/photo9.jpg',
    title: 'Gilded Hope, Barred from View',
    category: 'Flower',
  },

  {
    src: '/images/web/photo11.jpg',
    title: "Twilight's Velvet Bloom",
    category: 'Flower',
  },
   {
    src: '/images/web/photo2.jpg',
    title: 'Urban Bougainvillea',
    category: 'Urban',
  },

  {
    src: '/images/web/photo13.jpg',
    title: 'Stardust & Bokeh Dreams',
    category: 'Flower',
  },
  {
    src: '/images/web/photo14.jpg',
    title: "Sunset's Golden Spears",
    category: 'Nature',
  },
  {
    src: '/images/web/photo15.jpg',
    title: 'Ember in the Windowed Soul',
    category: 'Cat',
  },
  {
    src: '/images/web/photo16.jpg',
    title: 'Nocturne on a Shadowed Walk',
    category: 'Street',
  },
  {
    src: '/images/web/photo17.jpg',
    title: 'Last Light on a Grassy Plume',
    category: 'Nature',
  },
  {
    src: '/images/web/photo18.jpg',
    title: 'Verdant Slumber, Feathered Dream',
    category: 'Wildlife',
  },
  {
    src: '/images/web/photo1.jpg',
    title: 'Magenta Bougainvillea Blooms Against a Summer Sky',
    category: 'Flower',
  },
  {
    src: '/images/web/photo20.jpg',
    title: "Twilight's Embrace, Where Palms Meet Sky",
    category: 'Nature',
  },
  {
    src: '/images/web/photo21.jpg',
    title: "Bark Navigator's Green Repast",
    category: 'Wildlife',
  },
  {
    src: '/images/web/photo22.jpg',
    title: 'Chromatic Whispers, Light as Air',
    category: 'Conceptual',
  },
  {
    src: '/images/web/photo23.jpg',
    title: "Winter's Lace Against the Light",
    category: 'Nature',
  },
  {
    src: '/images/web/photo24.jpg',
    title: 'Weaver of Sunlit Silks',
    category: 'Wildlife',
  },
  {
    src: '/images/web/photo25.jpg',
    title: 'Ancient Gaze Amidst the Green',
    category: 'Wildlife',
  },
  {
    src: '/images/web/photo3.jpg',
    title: 'Bougainvillea Lined Street',
    category: 'Nature',
  },
  {
    src: '/images/web/photo26.jpg',
    title: "Monochrome Dreams in a Child's Gaze",
    category: 'Street',
  },
{
    src: '/images/web/photo27.jpg',
    title: 'Curious Cat Peering from Above',
    category: 'Cat',
  },
  {
    src: '/images/web/photo28.jpg',
    title: 'Orange Tabby Profile with Red Collar',
    category: 'Cat',
  },
  {
    src: '/images/web/photo29.jpg',
    title: 'Confident Orange Cat Approaching',
    category: 'Cat',
  },
  {
    src: '/images/web/photo30.jpg',
    title: 'Orange Cat on the Move',
    category: 'Cat',
  },
  {
    src: '/images/web/photo31.jpg',
    title: 'Seated Orange Cat Observing',
    category: 'Cat',
  },
  {
    src: '/images/web/photo32.jpg',
    title: 'Orange Cat Looking Over Its Shoulder',
    category: 'Cat',
  },
  {
    src: '/images/web/photo33.jpg',
    title: 'Relaxing Orange Cat Resting on Pavement',
    category: 'Cat',
  },
  {
    src: '/images/web/photo34.jpg',
    title: 'Alert White Cat in the Garden',
    category: 'Cat',
  },
  {
    src: '/images/web/photo35.jpg',
    title: 'Vibrant Sunflower Close-Up',
    category: 'Flower',
  },
  {
    src: '/images/web/photo36.jpg',
    title: 'Delicate Magenta Blossoms',
    category: 'Flower',
  },
  {
    src: '/images/web/photo37.jpg',
    title: 'Backlit Petunias in a Hanging Planter',
    category: 'Flower',
  },
  {
    src: '/images/web/photo38.jpg',
    title: 'Glowing Pink Petunia Flowers',
    category: 'Flower',
  },
  {
    src: '/images/web/photo39.jpg',
    title: 'Elegant White Lily and Buds',
    category: 'Flower',
  },
  {
    src: '/images/web/photo40.jpg',
    title: 'Blooming White Lily in the Shadows',
    category: 'Flower',
  },
  {
    src: '/images/web/photo41.jpg',
    title: 'Close-Up of a Pristine White Lily',
    category: 'Flower',
  },
  {
    src: '/images/web/photo42.jpg',
    title: 'White Lily Stretching Towards the Light',
    category: 'Flower',
  },
      {
    src: '/images/web/photo43.jpg',
    title: 'Sunflowers in Soft Focus',
    category: 'Flower',
  },
      {
  src: '/images/web/photo44.jpg',
  title: 'Modern Glass Building at Golden Hour',
  category: 'Architecture',
  },
      {
    src: '/images/web/photo45.jpg',
    title: 'Streetlight Piercing the Fog',
    category: 'Nightscape',
  },
  {
    src: '/images/web/photo46.jpg',
    title: 'Glowing Moon Through the Branches',
    category: 'Nightscape',
  },
  {
    src: '/images/web/photo47.jpg',
    title: 'Orange Moon in the Night Sky',
    category: 'Nightscape',
  },
  {
    src: '/images/web/photo48.jpg',
    title: 'Misty Urban Nightscape',
    category: 'Nightscape',
  },
  {
  src: '/images/web/photo49.jpg',
  title: 'Minimalist Bird on a Wire',
  category: 'Street',
  },
  {
    src: '/images/web/photo50.jpg',
    title: 'Balloon Vendor on the Sidewalk',
    category: 'Street',
  },
  {
    src: '/images/web/photo51.jpg',
    title: 'Speeding Motorcyclist in the City',
    category: 'Street',
  },
  {
    src: '/images/web/photo52.jpg',
    title: 'Colorful Rickshaw in Motion',
    category: 'Street',
  },
  {
    src: '/images/web/photo53.jpg',
    title: 'Night Ride Through the Streets',
    category: 'Street',
  },
  {
    src: '/images/web/photo54.jpg',
    title: 'Evening Rickshaw Journey',
    category: 'Street',
  },
  {
    src: '/images/web/photo55.jpg',
    title: 'Market Vendor in the Shadows',
    category: 'Street',
  },
  {
    src: '/images/web/photo56.jpg',
    title: 'A Moment of Rest',
    category: 'Street',
  },
  {
    src: '/images/web/photo57.jpg',
    title: 'The Weight of the City',
    category: 'Street',
  },
  {
    src: '/images/web/photo78.jpg',
    title: 'Birds in Flight',
    category: 'Nature',
  },
  {
    src: '/images/web/photo79.jpg',
    title: 'Assistance on the Street',
    category: 'Street',
  },
  {
    src: '/images/web/photo80.jpg',
    title: 'Sleeping Child',
    category: 'Street',
  },
  {
    src: '/images/web/photo81.jpg',
    title: 'Fiery City Sunset',
    category: 'Urban',
  },
  {
    src: '/images/web/photo82.jpg',
    title: 'Curious Street Cat',
    category: 'Animals',
  },
  {
    src: '/images/web/photo83.jpg',
    title: 'Cloud Over the Alley',
    category: 'Urban',
  },
  {
    src: '/images/web/photo84.jpg',
    title: 'The Watcher',
    category: 'Street',
  },
  {
    src: '/images/web/photo85.jpg',
    title: 'Breaking Clouds',
    category: 'Sky',
  },
  {
    src: '/images/web/photo86.jpg',
    title: 'Half Moon',
    category: 'Sky',
  },
  {
    src: '/images/web/photo68.jpg',
    title: 'Passing By',
    category: 'Street',
  },
  {
    src: '/images/web/photo69.jpg',
    title: 'Urban Traffic Horizon',
    category: 'Urban',
  },
  {
    src: '/images/web/photo70.jpg',
    title: 'Rider on the Boulevard',
    category: 'Street',
  },
  {
    src: '/images/web/photo71.jpg',
    title: 'Leaves Against the Blue',
    category: 'Nature',
  },
  {
    src: '/images/web/photo72.jpg',
    title: 'Sunburst Over Silhouettes',
    category: 'Sky',
  },
  {
    src: '/images/web/photo73.jpg',
    title: 'Solitary Flight',
    category: 'Nature',
  },
  {
    src: '/images/web/photo74.jpg',
    title: 'Pair in Motion',
    category: 'Nature',
  },
  {
    src: '/images/web/photo75.jpg',
    title: 'Perched Pigeon',
    category: 'Nature',
  },
  {
    src: '/images/web/photo76.jpg',
    title: 'Dual Glides',
    category: 'Nature',
  },
  {
    src: '/images/web/photo77.jpg',
    title: 'Trio of Wings',
    category: 'Nature',
  },
  {
    src: '/images/web/photo58.jpg',
    title: 'Rancon Skyline',
    category: 'Urban',
  },
  {
    src: '/images/web/photo59.jpg',
    title: 'Tri-Star Boulevard',
    category: 'Urban',
  },
  {
    src: '/images/web/photo60.jpg',
    title: 'Crescent Over High-Rise',
    category: 'Sky',
  },
  {
    src: '/images/web/photo61.jpg',
    title: 'Solitary Crescent',
    category: 'Sky',
  },
  {
    src: '/images/web/photo62.jpg',
    title: 'Curbside Rest',
    category: 'Street',
  },
  {
    src: '/images/web/photo64.jpg',
    title: 'The Banana Carrier',
    category: 'Street',
  },
  {
    src: '/images/web/photo63.jpg',
    title: 'Alleyway Prowler',
    category: 'Animals',
  },
  {
    src: '/images/web/photo66.jpg',
    title: 'Through the Frame',
    category: 'Street',
  },
  {
    src: '/images/web/photo65.jpg',
    title: 'Curious Ginger',
    category: 'Animals',
  },
  {
    src: '/images/web/photo67.jpg',
    title: 'Vocal Feline',
    category: 'Animals',
  },
  {
    src: '/images/web/photo87.jpg',
    title: 'Bougainvillea Over a Quiet Street',
    category: 'Street',
  },
  {
    src: '/images/web/photo88.jpg',
    title: 'Light Breaking Over the Skyline',
    category: 'Sky',
  },
  {
    src: '/images/web/photo89.jpg',
    title: 'Paint Pots on the Workbench',
    category: 'Studio',
  },
  {
    src: '/images/web/photo90.jpg',
    title: 'Sculpture on a Sketched Sheet',
    category: 'Conceptual',
  },
  {
    src: '/images/web/photo91.jpg',
    title: "The Painter's Table",
    category: 'Studio',
  },
  {
    src: '/images/web/photo92.jpg',
    title: 'A Floor Full of Colour',
    category: 'Studio',
  },
  {
    src: '/images/web/photo93.jpg',
    title: 'Canvas Waiting in the Studio',
    category: 'Studio',
  },
  {
    src: '/images/web/photo94.jpg',
    title: 'Half Moon in the Dark',
    category: 'Nightscape',
  },
  {
    src: '/images/web/photo95.jpg',
    title: 'Kash Flowers Against the Clouds',
    category: 'Nature',
  },
  {
    src: '/images/web/photo96.jpg',
    title: 'Kash in the Setting Sun',
    category: 'Nature',
  },
  {
    src: '/images/web/photo97.jpg',
    title: 'Golden Hour Over the Kash Field',
    category: 'Nature',
  },
  {
    src: '/images/web/photo98.jpg',
    title: 'Smoke Rising at Dusk',
    category: 'Nightscape',
  },
  {
    src: '/images/web/photo99.jpg',
    title: 'Window Cleaner in the Frame',
    category: 'Street',
  },
  {
    src: '/images/web/photo100.jpg',
    title: 'Café Table by the Glass',
    category: 'Architecture',
  },
  {
    src: '/images/web/photo101.jpg',
    title: 'Morning Sweep',
    category: 'Street',
  },
  {
    src: '/images/web/photo102.jpg',
    title: 'Parked in Dappled Shade',
    category: 'Urban',
  },
  {
    src: '/images/web/photo103.jpg',
    title: 'Rickshaw Through the Shade',
    category: 'Street',
  },
  {
    src: '/images/web/photo104.jpg',
    title: 'Walking the Bicycle Home',
    category: 'Street',
  },
  {
    src: '/images/web/photo105.jpg',
    title: 'Three Friends on the Sidewalk',
    category: 'Street',
  },
  {
    src: '/images/web/photo106.jpg',
    title: 'Three Friends, Up Close',
    category: 'Street',
  },
  {
    src: '/images/web/photo107.jpg',
    title: 'Guard at the Crossing',
    category: 'Street',
  },
  {
    src: '/images/web/photo108.jpg',
    title: 'A Walk Under the Trees',
    category: 'Urban',
  },
  {
    src: '/images/web/photo109.jpg',
    title: 'Painted Rickshaw on a Leafy Road',
    category: 'Street',
  },
];

// Attach each photo's real size (from `npm run optimize:images`) so the
// gallery can reserve the right space before the image loads.
const photos = rawPhotos.map((photo) => {
  const [width, height] = photoDimensions[photo.src] || [4, 5];
  return { ...photo, width, height };
});

// Built from the photos so every category is reachable from the filter.
const categories = [
  'All',
  ...Array.from(new Set(photos.map((photo) => photo.category))).sort((a, b) => a.localeCompare(b)),
];

export { categories, photos };

