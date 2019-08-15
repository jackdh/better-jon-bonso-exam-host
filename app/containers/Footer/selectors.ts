import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the footer state domain
 */

const selectFooterDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Footer
 */

const selectFooter = () =>
  createSelector(
    selectFooterDomain,
    substate => {
      return substate;
    },
  );

export default selectFooter;
export { selectFooterDomain };
