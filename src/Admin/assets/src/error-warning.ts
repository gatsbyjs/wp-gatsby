import { RemoteStatusUnion } from "./preview-status"
const timeoutSeconds: number = 45
const timeoutMilliseconds: number = 1000 * timeoutSeconds

/**
 * After 45 seconds, display a warning, unless cancelled by clearing this timeout once the UI is updated and the iframe is loaded.
 */
export const timeoutWarning: number = setTimeout(() => {
	updateLoaderWarning(
		`Preview is taking a very long time to load (more than ${timeoutSeconds} seconds).<br />Try pressing "preview" again from the WordPress edit screen.<br />If you see this again, your preview builds are either slow or there's something wrong.`,
	)
}, timeoutMilliseconds)

export type CustomError = {
	message: string
	remoteStatus?: RemoteStatusUnion
}

type ShowableError = CustomError | Error | string

export function showError(error: ShowableError): void {
	if (typeof error === `string`) {
		error = {
			message: error,
		}
	}

	const iframe: HTMLIFrameElement = document.getElementById(
		"preview",
	) as HTMLIFrameElement

	iframe.style.display = "none"

	const loader: HTMLElement = document.getElementById("loader")

	loader.style.display = "none"

	const errorElement: HTMLElement = document.getElementById(
		"error-message-element",
	)

	errorElement.textContent = error.message

	const content: HTMLElement = document.querySelector(
		".content.error",
	) as HTMLElement

	content.style.display = "block"

	if (!(`remoteStatus` in error)) {
		return
	}

	switch (error.remoteStatus) {
		case `NO_PAGE_CREATED_FOR_PREVIEWED_NODE`:
			updateTroubleshootingMessage(`
			Gatsby wasn't able to find a page for the post you're trying to preview. This can mean one of three things:
			</p>
			<ol>
				 <li>A page is not being built for the post being previewed.</li>
				 <li>The id of this post is not being included in the pageContext of it's Gatsby page.</li>
				 <li>An error was thrown in Gatsby during Preview sourcing (check your logs).</li>
			</ol>
			<br /> 
			<p>
				<b>Hint:</b> if you want to account for any possible post type (even those that haven't yet been registered) you can use the WpContentNode interface as a fallback template in gatsby-node.js when you're creating pages and you'll never see this message when registering new post types.			
		`)
			break

		case `GATSBY_PREVIEW_PROCESS_ERROR`:
			updateTroubleshootingMessage(`
				The Gatsby Preview process errored while sourcing this preview.<br />Please check your error logs for additional information.		
			`)
			break

		case `RECEIVED_PREVIEW_DATA_FROM_WRONG_URL`:
			updateTroubleshootingMessage(`
				The Gatsby instance this WP site is configured to send Previews to is configured to receive source data from a different WordPress instance. Please check your gatsby-config.js and WPGatsby settings to ensure the WordPress instance URL's match up.			
			`)
			break

		default:
			break
	}
}

function updateTroubleshootingMessage(message: string): void {
	const sharedMessage = `<br/><br/>If you're not a developer, please screenshot this page and send it to your developer.<br /><br /><b>Note:</b> Once this error is fixed, you'll need to press "preview" again to clear out this message.`

	const troubleshootingElement = document.getElementById(
		"troubleshooting-html-area",
	)

	troubleshootingElement.innerHTML = `
		<p>${message}${sharedMessage}</p>			
	`
}

export function updateLoaderWarning(message: string): void {
	const previewWarningP = document.getElementById("preview-loader-warning")

	previewWarningP.innerHTML = `${message}<br /><br /><button id="cancel-button">Cancel and Troubleshoot</button>`
	previewWarningP.style.display = "initial"

	const cancelButton = document.getElementById("cancel-button")

	cancelButton.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			cancelPreviewLoader()
		}
	})

	cancelButton.addEventListener("click", cancelPreviewLoader)
}

function cancelPreviewLoader(): void {
	showError(`Preview was cancelled.`)
}
