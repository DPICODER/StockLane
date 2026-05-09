exports .generateSlug = (name) => {
    return name
        .toLowerCase()
        .normalize('NFD')                     // café → cafe (handles accents)
        .replace(/[\u0300-\u036f]/g, '')      // remove accent marks
        .replace(/[^a-z0-9\s-]/g, '')         // remove special chars like ! & '
        .trim()
        .replace(/\s+/g, '-')                 // spaces → hyphens
        .replace(/-+/g, '-');                 // collapse multiple hyphens
}


// generateSlug("John's Bakery! & Co.")   // → "johns-bakery-co"
// generateSlug("THE GYM 360")            // → "the-gym-360"
// generateSlug("Café Délice")            // → "cafe-delice"