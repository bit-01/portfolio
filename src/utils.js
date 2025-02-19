export function formatDate(
  date,
  withTime = true,
  locale = 'en',
  format = { month: 'long', day: 'numeric', year: 'numeric' },
) {
  if (date) {
    if (withTime) {
      format = { ...format, hour: '2-digit', minute: '2-digit', hour12: true }
    }
    return new Date(date).toLocaleDateString(locale, format)
  } else {
    return ''
  }
}

export function formatTime(t, locale = 'en') {
  if (t) {
    let d = new Date()
    d = new Date(d.toString().split(':')[0].slice(0, -2) + t)
    return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: true })
  } else return ''
}

export function generateId() {
  return Math.random().toString(16).slice(2)
}
