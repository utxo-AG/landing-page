/* One line of the platform log as plain data, used by the build (first frame) and by the loop. No DOM. */
const EVERY = 3;
const START = 20;

export const mod = (n, m) => ((n % m) + m) % m;

export function logLine(copy, n, model) {
  const [hours, minutes] = copy.clock.split(':').map(Number);
  const total = hours * 3600 + minutes * 60 + START + n * EVERY;
  const part = (value) => String(Math.floor(value) % 60).padStart(2, '0');
  const action = copy.actions[mod(n, copy.actions.length)];
  return {
    time: `${String(Math.floor(total / 3600) % 24).padStart(2, '0')}:${part(total / 60)}:${part(total)}`,
    agent: copy.agents[mod(n, copy.agents.length)],
    action: `${action.text} · ${copy.data[action.source]}`,
    source: action.source,
    model: copy.models[model].name,
  };
}
