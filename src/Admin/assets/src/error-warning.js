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
	errorElement.textContent = error

	const content = document.querySelector(".content.error")
	content.style.display = "block"
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
