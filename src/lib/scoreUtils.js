export function getScoreLevel(score) {
  if (score < 2) return 'poor';
  if (score < 3.5) return 'average';
  return 'excellent';
}

export function getScoreColor(score) {
  const level = getScoreLevel(score);
  if (level === 'poor') return 'text-danger';
  if (level === 'average') return 'text-warning';
  return 'text-success';
}

export function getScoreLabel(score) {
  const level = getScoreLevel(score);
  if (level === 'poor') return 'Needs Work';
  if (level === 'average') return 'Good';
  return 'Excellent';
}

export function getBgColorClass(score) {
  const level = getScoreLevel(score);
  if (level === 'poor') return 'bg-danger';
  if (level === 'average') return 'bg-warning';
  return 'bg-success';
}
