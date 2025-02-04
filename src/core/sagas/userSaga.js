import { put, call, takeEvery, all, fork } from "redux-saga/effects";


// // Comment here
// function* postLogin(action) {
//   try {
//     const data = yield call(AuthServices.login, action.params)
//     yield put({
//       type: REQUEST_POST_LOGIN_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* postRegister(action) {
//   try {
//     const data = yield call(AuthServices.register, action.params)
//     yield put({
//       type: REQUEST_POST_REGISTER_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* postFogot(action) {
//   try {
//     const data = yield call(AuthServices.forgot, action.params)
//     yield put({
//       type: REQUEST_POST_FORGOT_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getRanks(action) {
//   try {
//     const data = yield call(MasterDataService.getRanks)
//     yield put({
//       type: REQUEST_GET_RANKS_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getCompanies(action) {
//   try {
//     const data = yield call(MasterDataService.getCompanies)
//     yield put({
//       type: REQUEST_GET_COMPANIES_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getCountries(action) {
//   try {
//     const data = yield call(MasterDataService.getCountries)
//     yield put({
//       type: REQUEST_GET_COUNTRIES_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getStatus(action) {
//   try {
//     const data = yield call(MasterDataService.getStatus)
//     yield put({
//       type: REQUEST_GET_STATUS_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getAttribute(action) {
//   try {
//     const data = yield call(MasterDataService.getAttribute, action.params)
//     yield put({
//       type: REQUEST_GET_ATTRIBUTE_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }


// function* getEvent(action) {
//   try {
//     const data = yield call(EventServices.getEvent)
//     yield put({
//       type: REQUEST_GET_EVENT_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getEventSponsers(action) {
//   try {
//     const data = yield call(EventServices.getEventSponsers)
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getFAQs(action) {
//   try {
//     const data = yield call(FAQsSercive.getFAQs)
//     yield put({
//       type: REQUEST_GET_FAQS_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }


// function* postSession(action) {
//   try {
//     const data = yield call(EventServices.session.post, action.params)
//     yield put({
//       type: REQUEST_POST_SESSION_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }



// function* getSessionForYou(action) {
//   try {
//     const data = yield call(EventServices.session.getForYou)
//     yield put({
//       type: REQUEST_GET_SESSION_FORYOU_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* getSessionSpeaker(action) {
//   try {
//     const data = yield call(EventServices.session.getSpeaker)
//     yield put({
//       type: REQUEST_SESSION_GET_SPEAKER_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// function* postEventMeeting(action) {
//   try {
//     const data = yield call(EventServices.eventMeeting.post, action.params)
//     yield put({
//       type: REQUEST_POST_EVENT_MEETING_SUCCESS,
//       params: data
//     })
//     if (action.callBack) {
//       action.callBack(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

function* watchUser() {
  // yield takeEvery(REQUEST_POST_LOGIN, postLogin);
  

}

export default function* UserSaga() {
  yield all([fork(watchUser)]);
}
