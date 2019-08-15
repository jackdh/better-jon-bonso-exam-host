import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface FooterState {
  readonly default: any;
}

/* --- ACTIONS --- */
type FooterActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = FooterState;
type ContainerActions = FooterActions;

export { RootState, ContainerState, ContainerActions };
