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

export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\+963|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = match[1] ? '+963 ' : ''
    return [intlCode, ' ', match[2], ' ', match[3], ' ', match[4]].join('')
  }
  return null
}
