export const data = {
  permalink: "/search-index.json",
  eleventyExcludeFromCollections: true
};

export function render({ characters, destinations, books, videos }) {
  const index = [];

  characters.forEach(c => index.push({
    type: "Character",
    title: c.name,
    desc: c.role,
    href: `/crew/${c.slug}/`,
    haystack: [c.name, c.species, c.role, c.bio].filter(Boolean).join(" ").toLowerCase()
  }));

  destinations.forEach(d => index.push({
    type: "Destination",
    title: d.name,
    desc: d.hook,
    href: `/world/${d.slug}/`,
    haystack: [d.name, d.hook, d.region, ...(d.wildlife || [])].filter(Boolean).join(" ").toLowerCase()
  }));

  books.forEach(b => index.push({
    type: "Book",
    title: b.title,
    desc: b.blurb,
    href: `/books/${b.slug}/`,
    haystack: [b.title, b.blurb].filter(Boolean).join(" ").toLowerCase()
  }));

  videos.forEach(v => index.push({
    type: "Video",
    title: v.title,
    desc: v.caption,
    href: `/watch/#video-${v.slug}`,
    haystack: [v.title, v.caption, v.category].filter(Boolean).join(" ").toLowerCase()
  }));

  return JSON.stringify(index);
}
