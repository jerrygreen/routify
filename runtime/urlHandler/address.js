import '../../typedef.js'
import { writable2 } from '../utils.js'

const currentUrl = () => {
    const { pathname, search, hash } = window.location
    return pathname + search + hash
}

/**
 * @param {RoutifyRuntime} instance
 * @returns
 */
export const address = instance => {
    // todo should be urlTransformed - instance.urlTransformers

    const { set, subscribe, update, hooks, subscribers } = writable2(
        currentUrl(),
    )

    return {
        set,
        subscribe,
        update,
    }
}

// // pushstate: () => updatePage(),
// // replacestate: () => updatePage(),

// export { createUrlStoreAddress }

// const test = createUrlStoreAddress()

// const handle = test.subscribe(() => {})
// const handle2 = test.subscribe(() => {})
// const handle3 = test.subscribe(() => {})

// handle()
