const timeoutSeconds = 45
const timeoutMilliseconds = 1000 * timeoutSeconds

/**
 * After 45 seconds, display a warning, unless cancelled by clearing this timeout once the UI is updated and the iframe is loaded.
 */
export const timeoutWarning = setTimeout(() => {
	updateLoaderWarning(
		`Preview is taking a very long time to load (more than ${timeoutSeconds} seconds).<br />Try pressing "preview" again from the WordPress edit screen.<br />If you see this again, your preview builds are either slow or there's something wrong.`,
	)
}, timeoutMilliseconds)

export function showError(error) {
	const iframe = document.getElementById("preview")
	iframe.style.display = "none"

	const loader = document.getElementById("loader")
	loader.style.display = "none"

	const errorElement = document.getElementById("error-message-element")
	errorElement.textContent = `${error.message}${
		error.context
			? `:
${error.context}`
			: ``
	}`

	const content = document.querySelector(".content.error")
	content.style.display = "block"

	if (error.message === `NO_PAGE_CREATED_FOR_PREVIEWED_NODE`) {
		document.getElementById("troubleshooting-html-area").innerHTML = `
			<p>If you're not a developer, please screenshot this page and send it to your developer.<br /><br /><b>Note:</b> Once this error is fixed, you'll need to press "preview" again to clear out this message.<br/><br/>Gatsby wasn't able to find a page for the post you're trying to preview. This can mean one of three things:
			</p>
			<ol>
				 <li>A page is not being built for the post being previewed.</li>
				 <li>The id of this post is not being included in the pageContext of it's Gatsby page.</li>
				 <li>An error was thrown in Gatsby during Preview sourcing (check your logs).</li>
			</ol>
			<br /> 
			<p>
				<b>Hint:</b> if you want to account for any possible post type (even those that haven't yet been registered) you can use the WpContentNode interface as a fallback template in gatsby-node.js when you're creating pages and you'll never see this message when registering new post types.
			</p>			
		`
	} else if (error.message === `GATSBY_PREVIEW_PROCESS_ERROR`) {
		document.getElementById("troubleshooting-html-area").innerHTML = `
			<p>If you're not a developer, please screenshot this page and send it to your developer.<br /><br /><b>Note:</b> Once this error is fixed, you'll need to press "preview" again to clear out this message.<br/><br/>The Gatsby Preview process errored while sourcing this preview.<br />Please check your error logs for additional information.
			</p>			
		`
	}
}

export function updateLoaderWarning(message) {
	const previewWarningP = document.getElementById("preview-loader-warning")

	previewWarningP.innerHTML = `${message}<br /><br /><button id="cancel-button" onclick="cancelPreviewLoader()">Cancel and Troubleshoot</button>`
	previewWarningP.style.display = "initial"

	const cancelButton = document.getElementById("cancel-button")

	cancelButton.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			cancelPreviewLoader()
		}
	})

	cancelButton.addEventListener("click", cancelPreviewLoader)
}

function cancelPreviewLoader() {
	showError(`Preview was cancelled.`)
}
