const SET_CURRENCY = 'SET_CURRENCY';

interface CurrencyState {
  currency: string;
}

interface SetCurrencyAction {
  type: typeof SET_CURRENCY;
  payload: string;
}

type CurrencyActionTypes = SetCurrencyAction;

export function setCurrency(currency: string): SetCurrencyAction {
  return { type: SET_CURRENCY, payload: currency };
}

const initialState: CurrencyState = {
  currency: 'USD', // initial currency value
};

export default function currencyReducer(
  state = initialState,
  action: CurrencyActionTypes
): CurrencyState {
  switch (action.type) {
    case SET_CURRENCY:
      return { ...state, currency: action.payload };
    default:
      return state;
  }
}
