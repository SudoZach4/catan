// ---------------------------------------------------------------------------
// EXPANSION SUPPORT
// ---------------------------------------------------------------------------

export const EXPANSION_IDS = {
  CITIES_KNIGHTS: 'cities-knights',
  SEAFARERS: 'seafarers',
  TRADERS_BARBARIANS: 'traders-barbarians'
};

export function normalizeExpansions(expansions = []) {
  if (!Array.isArray(expansions)) return [];
  return [...new Set(expansions.filter(Boolean))];
}

export function hasExpansion(game, expansionId) {
  return (game?.expansions || []).includes(expansionId);
}

export function isCitiesKnightsEnabled(game) {
  return hasExpansion(game, EXPANSION_IDS.CITIES_KNIGHTS);
}

export function isSeafarersEnabled(game) {
  return hasExpansion(game, EXPANSION_IDS.SEAFARERS);
}

export function isTradersBarbariansEnabled(game) {
  return hasExpansion(game, EXPANSION_IDS.TRADERS_BARBARIANS);
}

// ---------------------------------------------------------------------------
// ... existing file below remains unchanged ...
