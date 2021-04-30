import { timeoutWarning } from "./error-warning"

import type { InitialState } from "./start-preview-client"

declare var initialState: InitialState

const previewFrontendIsOnlineQuery: string = /* GraphQL */ `
	query PREVIEW_FRONTEND_IS_ONLINE {
		wpGatsby {
			isPreviewFrontendOnline
		}
	}
`

const previewStatusQuery: string = /* GraphQL */ `
	query PREVIEW_STATUS_QUERY($postId: Float!) {
		wpGatsby {
			gatsbyPreviewStatus(nodeId: $postId) {
				pageNode {
					path
				}
				statusType
				remoteStatus
				statusContext
			}
		}
	}
`

const wpPreviewedNodeStatus = [
	`NO_NODE_FOUND`,
	`PREVIEW_READY`,
	`REMOTE_NODE_NOT_YET_UPDATED`,
	`NO_PREVIEW_PATH_FOUND`,
	`PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED`,
] as const

type WpPreviewedNodeStatusUnion = typeof wpPreviewedNodeStatus[number]

const remoteStatuses = [
	`NO_PAGE_CREATED_FOR_PREVIEWED_NODE`,
	`GATSBY_PREVIEW_PROCESS_ERROR`,
	`RECEIVED_PREVIEW_DATA_FROM_WRONG_URL`,
] as const

export type RemoteStatusUnion = typeof remoteStatuses[number]

type PreviewStatusResponseJson = {
	data: {
		wpGatsby: {
			gatsbyPreviewStatus: {
				pageNode: {
					path: string
				}
				statusType: WpPreviewedNodeStatusUnion
				remoteStatus: RemoteStatusUnion
				statusContext: string
			}
		}
	}
}

/**
 * This function checks the preview status that Gatsby has stored in post meta for
 * the parent post of this preview
 * When the preview is ready, it calls onPreviewReadyUpdateUI() which updates the UI
 *
 * If a status besides PREVIEW_READY comes back, we wait a bit and try again
 *
 * This function doesn't return anything
 */
export async function fetchPreviewStatusAndUpdateUI({
	refetchCount = 0,
	refetchDelay = 500,
} = {}): Promise<void> {
	const { wordpressSiteUrl, graphqlEndpoint } = initialState
	// Ask WPGraphQL for the status of this preview
	// Gatsby will update this when the preview is ready
	const response: PreviewStatusResponseJson = await (
		await fetch(`${wordpressSiteUrl}/?${graphqlEndpoint}`, {
			method: "POST",
			body: JSON.stringify({
				query: previewStatusQuery,
				variables: {
					postId: initialState.postId,
				},
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
	).json()

	const { statusType, remoteStatus, statusContext } =
		response?.data?.wpGatsby?.gatsbyPreviewStatus || {}

	const isSpecialStatus: boolean = remoteStatuses.includes(remoteStatus)

	if (isSpecialStatus) {
		console.log({ response })
		// we clear this timeout when the preview is ready so that the
		// "long preview time" warning doesn't appear
		clearTimeout(timeoutWarning)

		throw {
			remoteStatus,
			message: `Gatsby returned unsuccessful Preview status:\n${remoteStatus}${
				statusContext ? `\n\nWith additional context:\n${statusContext}` : ``
			}`,
		}
	}

	if (statusType) {
		console.log(statusType)
	}

	if (remoteStatus) {
		console.log(remoteStatus)
	}

	if (statusType === `PREVIEW_READY`) {
		clearTimeout(timeoutWarning)

		onPreviewReadyUpdateUI(response)

		// if the preview is ready we don't need to continue so we return here
		// this function isn't expected to return anything
		return
	}

	const refetchDelayMap = {
		// after 30 retries of 500ms, start checking every second
		30: 1000,
		// after 20 more retries of 1 second, start checking every 2 seconds
		50: 2000,
		// after 20 more retries of 2 seconds, start checking every 5 seconds
		70: 5000,
	}

	refetchCount++
	// our delay increases if we have a value for the current refetchCount
	refetchDelay = refetchDelayMap[refetchCount] || refetchDelay

	await new Promise((resolve) =>
		setTimeout(() => {
			resolve()
		}, refetchDelay),
	)

	// we need to await this so our top level start() fn can properly try/catch and display the error view
	await fetchPreviewStatusAndUpdateUI({
		refetchCount,
		refetchDelay,
	})
}

function onPreviewReadyUpdateUI(response: PreviewStatusResponseJson): void {
	const { gatsbyPreviewStatus } = response?.data?.wpGatsby || {}

	console.log({ previewReady: { gatsbyPreviewStatus } })

	if (
		!gatsbyPreviewStatus ||
		!gatsbyPreviewStatus.statusType ||
		!gatsbyPreviewStatus?.pageNode?.path
	) {
		throw Error(`Received an improper response from the Preview server.`)
	}

	const previewIframe: HTMLIFrameElement = document.getElementById(
		"preview",
	) as HTMLIFrameElement

	// when the iframe loads we want our iframe loaded event to fire
	// so we can remove the loader
	previewIframe.addEventListener("load", onIframeLoadedHideLoaderUI)

	console.log(`Loading Gatsby Preview in an iframe...`)
	// point the iframe at the frontend preview url for this preview
	previewIframe.src =
		initialState.previewFrontendUrl + gatsbyPreviewStatus.pageNode.path

	const event = new Event("wp-gatsby-preview-ready")
	document.dispatchEvent(event)
}

function onIframeLoadedHideLoaderUI(): void {
	const loader: HTMLElement = document.getElementById("loader")
	console.log(`Loaded Gatsby Preview!`)

	console.log(loader)

	// this delay prevents a flash between
	// the iframe painting and the loader dissapearing
	setTimeout(() => {
		// there is a fadeout css animation on this
		loader.classList.add("loaded")

		setTimeout(() => {
			// we wait a sec to display none so the css animation fadeout can complete
			loader.style.display = "none"
		}, 100)
	}, 50)
}

const requestPreviewFrontendIsOnline = async (): Promise<boolean> =>
	(
		await (
			await fetch(`/?${initialState.graphqlEndpoint}`, {
				method: "POST",
				body: JSON.stringify({
					query: previewFrontendIsOnlineQuery,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
		).json()
	)?.data?.wpGatsby?.isPreviewFrontendOnline

let frontendOnlineCheckCount = 0

/**
 * If our backend webhook preview POST came back with an error, we can't be sure our frontend is online.
 * So this function checks just that and then after 10 seconds (+ request time) of it not being online it will show an error
 * If it's online it will start the preview status watcher and update the UI
 */
export async function doubleCheckIfPreviewFrontendIsOnline(): Promise<void> {
	const previewFrontendIsOnline: boolean = await requestPreviewFrontendIsOnline()

	if (previewFrontendIsOnline) {
		// if the response came back ok start loading the frontend
		//  because the frontend actually is online
		await fetchPreviewStatusAndUpdateUI()
	} else if (frontendOnlineCheckCount < 10) {
		console.log(`frontend not online.. rechecking`)

		frontendOnlineCheckCount++

		await new Promise((resolve) => setTimeout(resolve, 1000))

		await doubleCheckIfPreviewFrontendIsOnline()
	} else {
		// otherwise throwing this will display the error UI
		throw Error(`The Gatsby Preview frontend is not responding to requests.`)
	}
}
