import { ul, li, a } from '@cycle/dom'
import styles from './DevBar.css'

export default function DevBar (sources, path$) {
  const {router: {createHref}} = sources

  const dashboardHref = createHref('/')
  const loginHref = createHref('/login')
  const practitionerDetailsHref = createHref('/practitioners/1')
  const practitionerDetailsV2Href = createHref('/practitioners/v2/1')
  const organizationDetailsHref = createHref('/organizations/1')
  const locationDetailsHref = createHref('/locations/1')

  const view$ = path$.map(() => {
    return ul({
      className: styles.container
    }, [
      li({
        className: styles.item
      }, [
        a({ attributes: { href: loginHref } }, 'Login')
      ]),
      li({
        className: styles.item
      }, [
        a({ attributes: { href: dashboardHref } }, 'Dashboard')
      ]),
      li({
        className: styles.item
      }, [
        a({ attributes: { href: practitionerDetailsHref } }, 'PractitionerDetails')
      ]),
      li({
        className: styles.item
      }, [
        a({ attributes: { href: practitionerDetailsV2Href } }, 'PractitionerDetailsV2')
      ]),
      li({
        className: styles.item
      }, [
        a({ attributes: { href: organizationDetailsHref } }, 'OrganizationDetails')
      ]),
      li({
        className: styles.item
      }, [
        a({ attributes: { href: locationDetailsHref } }, 'LocationDetails')
      ])
    ])
  })

  return {DOM: view$}
}
