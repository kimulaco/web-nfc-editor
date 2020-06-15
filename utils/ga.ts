export const GA_TRACKING_ID = 'UA-169425309-1'

export const sendPageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const sendEvent = (
  { action, category, label, value }: {[key: string]: string | number}
) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
