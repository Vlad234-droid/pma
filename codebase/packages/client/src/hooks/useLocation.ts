import { Location as LocationType, useLocation } from 'react-router-dom';

interface LocationWithState<S> extends LocationType {
  state: S;
}

export default <S>() => useLocation() as LocationWithState<S>;
