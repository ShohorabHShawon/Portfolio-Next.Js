const photos = [
  {
    src: '/images/photo1.png',
    title: 'Magenta Bougainvillea Blooms Against a Summer Sky',
    description:
      'A beautiful shot of vibrant magenta bougainvillea flowers reaching towards a pale blue sky with soft clouds. The image captures the delicate texture of the bracts and the lush green foliage, with a dreamy, slightly blurred foreground enhancing the depth of field.',
    category: 'Flower',
  },
  {
    src: '/images/photo2.png',
    title: 'Urban Bougainvillea',
    description:
      'Vibrant bougainvillea flowers bloom beside a modern building under a soft sky.',
    category: 'Urban',
  },
  {
    src: '/images/photo3.png',
    title: 'Bougainvillea Lined Street',
    description:
      'Vibrant pink bougainvillea overhangs a quiet street with a figure walking in the distance.',
    category: 'Nature',
  },
  {
    src: '/images/photo4.png',
    title: 'Rickshaw Ride Under Bougainvillea',
    description:
      'A colorful rickshaw travels down a street, framed by overhanging pink bougainvillea and green trees.',
    category: 'Urban',
  },
  {
    src: '/images/photo5.png',
    title: 'Cycling Past Bougainvillea',
    description:
      'A man on a bicycle with a blue crate rides down a street lined with bright pink bougainvillea.',
    category: 'Street',
  },
  {
    src: '/images/photo6.png',
    title: 'Cat Silhouette Against the Full Moon',
    description:
      'A charming silhouette of a cat sits on grass, gazing up at a large, detailed full moon in a dark night sky.',
    category: 'Conceptual',
  },
  {
    src: '/images/photo7.png',
    title: 'Dreams and Weight',
    description: 'The Weight We Carry, the Dreams We Watch.',
    category: 'Street',
  },
  {
    src: '/images/photo8.png',
    title: 'Sunset Hues & Fleeting Joys',
    description:
      "In the warm embrace of the evening light, a vibrant cluster of balloons offers a beacon of delight. Figures, perhaps a family, are gathered, suggesting a shared moment of simple happiness. The scene, with its soft focus and rich colors, evokes a sense of community and the ephemeral beauty of daily life. The attire of the woman in the yellow garment and the man's lungi might suggest a South Asian setting.",
    category: 'Street',
  },
  {
    src: '/images/photo9.png',
    title: 'Gilded Hope, Barred from View',
    description:
      'A solitary yellow trumpet flower, possibly Tecoma stans, defiantly blooms, its bright form a stark contrast to the dark, out-of-focus bars of a fence that partially obscure it. The image speaks to resilience and beauty found in unexpected places, a small sunbeam caught in a shadowed world.',
    category: 'Flower',
  },
  {
    src: '/images/photo10.png',
    title: 'Skyward Fire, Petal & Plume',
    description:
      "Like a burst of floral fireworks, the intricate red and orange bloom, likely a Caesalpinia pulcherrima, reaches for the heavens. Its delicate, extended stamens and fern-like leaves are set against a soft, clouded sky, highlighting nature's vivid artistry.",
    category: 'Flower',
  },
  {
    src: '/images/photo11.png',
    title: "Twilight's Velvet Bloom",
    description:
      'Vibrant magenta flowers, possibly Mirabilis jalapa, emerge from the deep shadows, their delicate, trumpet-like forms glowing against a dark, textured backdrop. The image captures the quiet beauty of night-blooming flora, a splash of color in the encroaching darkness.',
    category: 'Flower',
  },
  {
    src: '/images/photo12.png',
    title: 'Path of Whispering Shadows',
    description:
      'Figures traverse a sun-dappled road, enveloped by an archway of dense trees that cast deep, contrasting shadows. This high-contrast black and white scene, possibly from a place like Irigolkavu as suggested by image data, evokes a sense of journey through a serene, almost mystical, natural tunnel.',
    category: 'Street',
  },
  {
    src: '/images/photo13.png',
    title: 'Stardust & Bokeh Dreams',
    description:
      "A cluster of star-shaped leaves or nascent buds, perhaps of an Epidendrum orchid, catches the light, surrounded by a dreamlike aura of colorful bokeh. The image is a dance of focus and blur, where nature's details merge into a soft, impressionistic tapestry of light and color.",
    category: 'Flower',
  },
  {
    src: '/images/photo14.png',
    title: "Sunset's Golden Spears",
    description:
      'Tall blades of wild grass, possibly "rumput senja" (twilight grass), stand like sentinels, their plumes ignited by the setting sun. Against a dramatic, cloud-streaked sky, with the distant silhouette of power lines, the scene captures the raw beauty of the landscape at the transition from day to night.',
    category: 'Nature',
  },
  {
    src: '/images/photo15.png',
    title: 'Ember in the Windowed Soul',
    description:
      "An extreme close-up reveals the captivating intensity of a cat's eye. The fiery orange-red iris glows, and the vertical pupil holds a tiny, sharp reflection of a window, offering a glimpse into the animal's world and a universe within its gaze.",
    category: 'Cat',
  },
  {
    src: '/images/photo16.png',
    title: 'Nocturne on a Shadowed Walk',
    description:
      'In this stark black and white night scene, possibly from a city like Lucknow, a solitary figure walks along a covered pathway. The interplay of bright streetlights and deep, elongated shadows creates a moody, atmospheric tableau of urban solitude.',
    category: 'Street',
  },
  {
    src: '/images/photo17.png',
    title: 'Last Light on a Grassy Plume',
    description:
      'A feathery plume of wild grass, perhaps Imperata cylindrica or Saccharum spontaneum, is silhouetted against the warm orb of the setting sun. The soft focus and muted tones of the cloudy sky lend a serene, almost melancholic beauty to this end-of-day natural scene.',
    category: 'Nature',
  },
  {
    src: '/images/photo18.png',
    title: 'Verdant Slumber, Feathered Dream',
    description:
      'A small, speckled owlet, likely a Spotted Owlet, finds serene repose upon a branch, its eyes gently closed. Swathed in a lush canopy of vibrant green leaves, this feathered creature seems lost in a quiet, daytime dream, a moment of pure tranquility in the natural world.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo19.png',
    title: 'Citrus Jewel, Effervescent Dance',
    description:
      "A vividly green lime slice, illuminated from behind, reveals its radiant, translucent segments and a delicate crown of sparkling bubbles. Submerged in cool, dark water, it's a macro celebration of zest and refreshment, where light and liquid play.",
    category: 'Conceptual',
  },
  {
    src: '/images/photo20.png',
    title: "Twilight's Embrace, Where Palms Meet Sky",
    description:
      'Silhouetted palm trees and a distant electrical tower stand etched against a sky ablaze with the warm hues of "senja kampung" (village twilight). Wild grasses in the foreground whisper in the fading light, capturing the peaceful yet evolving mood of a South Asian landscape at dusk.',
    category: 'Nature',
  },
  {
    src: '/images/photo21.png',
    title: "Bark Navigator's Green Repast",
    description:
      "An agile Indian palm squirrel, its striped coat a soft contrast to the rough tree bark, descends headfirst for a tender bite. Clinging effortlessly, it savors a fresh green leaf, a fleeting moment of nature's daily rhythm.",
    category: 'Wildlife',
  },
  {
    src: '/images/photo22.png',
    title: 'Chromatic Whispers, Light as Air',
    description:
      'A delicate gathering of soft feathers – fiery red, gentle orange, and cool blue – creates a vibrant tapestry against a luminous, ethereal white backdrop. Their fine barbs and gentle curves evoke a sense of lightness and the subtle artistry of plumage.',
    category: 'Conceptual',
  },
  {
    src: '/images/photo23.png',
    title: "Winter's Lace Against the Light",
    description:
      'Dark, denuded branches stretch like intricate calligraphy across a stark, bright sky. This minimalist composition, rendered in high contrast, highlights the elegant, skeletal forms of trees in their winter slumber or dry season repose.',
    category: 'Nature',
  },
  {
    src: '/images/photo24.png',
    title: 'Weaver of Sunlit Silks',
    description:
      "A formidable Golden Orb-weaver spider, perhaps a Nephila species, commands the center of its meticulously spun, shimmering web. Backlit by the soft green bokeh of the forest, it's a portrait of nature's patient artistry and predatory grace.",
    category: 'Wildlife',
  },
  {
    src: '/images/photo25.png',
    title: 'Ancient Gaze Amidst the Green',
    description:
      'A Bengal or Asian water monitor lizard, its skin a mosaic of earthy tones and intricate scales, lies low within a lush tapestry of vibrant green grass. Its alert eye surveys its surroundings, a timeless reptilian presence grounded in the verdant earth.',
    category: 'Wildlife',
  },
  {
    src: '/images/photo26.png',
    title: "Monochrome Dreams in a Child's Gaze",
    description:
      'In this stark black and white street portrait, a young boy, likely a balloon seller, peeks out from behind a buoyant cloud of patterned balloons. His direct gaze holds a quiet story, a moment of youthful presence amidst the daily flow, rendered with timeless grace.',
    category: 'Street',
  },
];

const categories = [
  'All',
  'Cat',
  'Conceptual',
  'Flower',
  'Nature',
  'Street',
  'Urban',
  'Wildlife',
];

export { photos, categories };
