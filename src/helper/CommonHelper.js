/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
export class CommonHelper {
    static data = {
        eventCode: null,
        language: 'vi'
    }

    static setCommon(state) {
        this.data = {
            ...this.data,
            ...state
        }
    }
}
