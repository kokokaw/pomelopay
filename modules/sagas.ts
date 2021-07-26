import { all } from "redux-saga/effects";

import transaction from "./transaction/saga";

export default function* rootSaga() {
  yield all([transaction()]);
}
