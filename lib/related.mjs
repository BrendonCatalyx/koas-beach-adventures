/**
 * RELATED CONTENT ENGINE — build-time version.
 * Same logic as v2.0's client-side getRelated() in app.js, just running
 * during the Eleventy build instead of in the browser. Every detail page's
 * "Continue the adventure" block is computed from data cross-references
 * (homeSlug, booksSlugs, friendSlug, destinationSlug, bookSlug) — nothing
 * is manually curated per page.
 */

export function findBySlug(list, slug){
  return (list || []).find(item => item.slug === slug) || null;
}

export function getRelated(type, slug, { characters, destinations, books }){
  const items = [];

  if(type === 'character'){
    const c = findBySlug(characters, slug);
    if(!c) return items;
    if(c.homeSlug){
      const dest = findBySlug(destinations, c.homeSlug);
      if(dest) items.push({ icon:'📍', label: dest.name, href:`/world/${dest.slug}/` });
    }
    if(c.booksSlugs && c.booksSlugs[0]){
      const book = findBySlug(books, c.booksSlugs[0]);
      if(book) items.push({ icon:'📚', label: book.title, href:`/books/${book.slug}/` });
    }
    items.push({ icon:'🎨', label:`Colour ${c.name}`, href:'/activities/#colouring' });
    const others = characters.filter(o => o.slug !== c.slug && o.status !== 'planned' && o.homeSlug === c.homeSlug);
    const pool = others.length ? others : characters.filter(o => o.slug !== c.slug && o.status !== 'planned');
    if(pool.length) items.push({ icon:'🐾', label:`Meet ${pool[0].name}`, href:`/crew/${pool[0].slug}/` });
  }

  if(type === 'destination'){
    const d = findBySlug(destinations, slug);
    if(!d) return items;
    if(d.friendSlug){
      const friend = findBySlug(characters, d.friendSlug);
      if(friend && friend.status !== 'planned') items.push({ icon:'🐾', label:`Meet ${friend.name}`, href:`/crew/${friend.slug}/` });
    }
    if(d.bookSlug){
      const book = findBySlug(books, d.bookSlug);
      if(book) items.push({ icon:'📚', label: book.title, href:`/books/${book.slug}/` });
    }
    items.push({ icon:'🎨', label:'Colouring pages', href:'/activities/#colouring' });
  }

  if(type === 'book'){
    const b = findBySlug(books, slug);
    if(!b) return items;
    if(b.friendSlug){
      const friend = findBySlug(characters, b.friendSlug);
      if(friend && friend.status !== 'planned') items.push({ icon:'🐾', label:`Meet ${friend.name}`, href:`/crew/${friend.slug}/` });
    }
    if(b.destinationSlug){
      const dest = findBySlug(destinations, b.destinationSlug);
      if(dest) items.push({ icon:'📍', label: dest.name, href:`/world/${dest.slug}/` });
    }
    items.push({ icon:'🎨', label:'Colouring pages', href:'/activities/#colouring' });
  }

  return items;
}
