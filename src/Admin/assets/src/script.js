/**
 * This file is printed out in preview-template.php
 * initialState global comes from preview-template.php above where this is printed to the page
 */
try {
	function updateLoaderWarning(message) {
		const previewWarningP = document.getElementById("preview-loader-warning")

		previewWarningP.innerHTML = `${message}<br /><br /><button onclick="cancelPreviewLoader()">Cancel and Troubleshoot</button>`
		previewWarningP.style.display = "initial"
	}

	const timeoutSeconds = 45
	const timeoutMilliseconds = 1000 * timeoutSeconds

	const timeoutWarning = setTimeout(() => {
		updateLoaderWarning(
			`Preview is taking a very long time to load (more than ${timeoutSeconds} seconds).<br />Try pressing "preview" again from the WordPress edit screen.<br />If you see this again, your preview builds are either slow or there's something wrong.`,
		)
	}, timeoutMilliseconds)

	function cancelPreviewLoader() {
		showError(`Preview was cancelled.`)
	}

	function fetchPreviewStatusAndUpdateUI({
		ignoreNoIndicationOfSourcing = false,
	} = {}) {
		fetch(initialState.previewFrontendUrl + `/__wpgatsby-preview-status`, {
			method: "POST",
			body: JSON.stringify({
				nodeId: initialState.nodeId,
				modified: initialState.modified,
				ignoreNoIndicationOfSourcing,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				onPreviewReady(response)
			})
			.catch((errorMessage) => {
				if (
					typeof errorMessage === `string` &&
					errorMessage.str_post(`Unexpected token < in JSON at position 0`)
				) {
					errorMessage += `\n\nYour version of gatsby-source-wordpress-experimental is likely out of date.\n\nPlease upgrade to the latest version.`
				}
				showError(errorMessage)
			})
	}

	fetchPreviewStatusAndUpdateUI()

	let noIndicationOfSourcingWarningTimeout

	function displayNoIndicationOfSourcingWarningAndTryAgain() {
		noIndicationOfSourcingWarningTimeout = setTimeout(() => {
			updateLoaderWarning(
				`There is no indication that preview data is being sourced by the server.<br /><br />A code change for this website might be deploying and blocking preview from working.<br /><br /><b>Please try pressing "preview" in WordPress again.</b><br />If you see this message again, wait 5 - 10 minutes and then try again,<br />or contact your developer for help.`,
			)
		}, timeoutMilliseconds)

		fetchPreviewStatusAndUpdateUI({ ignoreNoIndicationOfSourcing: true })
	}

	function onPreviewReady(response) {
		clearTimeout(timeoutWarning)

		if (response.type && response.type === `NOT_IN_PREVIEW_MODE`) {
			throw new Error(
				`Your Gatsby site is not in Preview mode.\nIf you're hosting on Gatsby Cloud, please see below for where to contact support.\nIf you're running Previews locally or are self-hosting, please refer to https://www.gatsbyjs.com/docs/refreshing-content to put Gatsby into Preview mode.`,
			)
		}

		if (response.type && response.type === `NO_INDICATION_OF_SOURCING`) {
			return displayNoIndicationOfSourcingWarningAndTryAgain()
		}

		console.log(`Received a response:`)
		console.log(response)

		if (
			!response.type ||
			!response.payload ||
			!response.payload.pageNode ||
			!response.payload.pageNode.path
		) {
			throw new Error(`Received an improper response from the Preview server.`)
		}

		const previewIframe = document.getElementById("preview")

		previewIframe.addEventListener("load", onIframeLoaded)

		previewIframe.src =
			initialState.previewFrontendUrl + response.payload.pageNode.path

		if (!noIndicationOfSourcingWarningTimeout) {
			clearTimeout(noIndicationOfSourcingWarningTimeout)
		}
	}

	function onIframeLoaded() {
		const loader = document.getElementById("loader")

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
} catch (e) {
	document.addEventListener("DOMContentLoaded", () => {
		showError(e)
	})
}

function showError(error) {
	const iframe = document.getElementById("preview")
	iframe.style.display = "none"

	const loader = document.getElementById("loader")
	loader.style.display = "none"

	const errorElement = document.getElementById("error-message-element")
	errorElement.textContent = error

	const content = document.querySelector(".content.error")
	content.style.display = "block"
}
