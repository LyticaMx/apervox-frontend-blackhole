import { AuthContext } from '../Auth/context'
import { PinsContext } from '../Pins/context'
import { LoaderContext } from '../Loader/LoaderContext'

export const appContext = {
  /* Reusable component */
  loader: LoaderContext,

  /* Modules */
  auth: AuthContext,
  pins: PinsContext
}
