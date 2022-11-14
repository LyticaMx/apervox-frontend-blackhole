import { AuthContext } from '../Auth/AuthContext'
import { PinsContext } from '../Pins/context'
import { LoaderContext } from '../Loader/LoaderContext'

export const appContext = {
  /* Reusable component */
  loader: LoaderContext,

  /* Modules */
  auth: AuthContext,
  pins: PinsContext
}
