import {Observable} from 'rx'
import styles from './Login.css'

export default function intent (sources) {
  const {DOM} = sources

  const emailInputValue$ = DOM.select('.email')
    .events('input')
    .map(ev => ev.target.value)

  const passwordInputValue$ = DOM.select('.password')
    .events('input')
    .map(ev => ev.target.value)

  const loginData$ = Observable.combineLatest(
    emailInputValue$.startWith(''),
    passwordInputValue$.startWith(''),
    (email, password) => {
      return {
        email,
        password
      }
    }
  )

  const submitClicks$ = DOM.select('.' + styles.button)
    .events('click')
    .flatMap(() => {
      const email$ = DOM.select('.email').observable.skip(1).take(1).map(data => data[0].value)
      const password$ = DOM.select('.password').observable.skip(1).take(1).map(data => data[0].value)
      return Observable.combineLatest(
        email$.startWith(''),
        password$.startWith(''),
        (email, password) => {
          console.log(email, password)
          return {
            email,
            password
          }
        }
      )
    })
    .startWith({})
    // .flatMapLatest(click => loginData$)

  return {
    emailInputValue$: emailInputValue$,
    submitClicks$: submitClicks$
  }
}
