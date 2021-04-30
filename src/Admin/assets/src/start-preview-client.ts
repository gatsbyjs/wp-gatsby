import "whatwg-fetch"

import { showError } from "./error-warning"
import {
	fetchPreviewStatusAndUpdateUI,
	doubleCheckIfPreviewFrontendIsOnline,
} from "./preview-status"

export type InitialState = {
	previewWebhookIsOnline: boolean
	previewFrontendUrl: string
	postId: number
	graphqlEndpoint: string
	webhookWasCalled: boolean
	wordpressSiteUrl: string
}

declare var initialState: InitialState

/**
 * This file is printed out in preview-template.php
 * initialState global comes from preview-template.php above where this is printed to the page
 */
start().catch((e) => {
	console.error(e)
	if (document.readyState === "complete") {
		// document is already ready to go so show the error
		showError(e)
	} else {
		// otherwise wait for it to load before showing the error
		document.addEventListener("DOMContentLoaded", () => {
			showError(e)
		})
	}
})

async function start(): Promise<void> {
	if (initialState.previewWebhookIsOnline) {
		// if we webhook came back as online, fetch the status and update the ui
		await fetchPreviewStatusAndUpdateUI()
	} else {
		// otherwise check to see if it actually is online
		// then if it is, fetch the status and update the UI
		await doubleCheckIfPreviewFrontendIsOnline()
	}
}
