export function cn(...classes) {
	return classes.filter(Boolean).join(' ')
}

export function parseMarkdown(markdown) {
	// Handle code blocks and store content with placeholders
	const codeBlocks = []
	markdown = markdown.replace(/```[\s\S]*?```/g, (match) => {
		const content = match
			.slice(3, -3)
			.replace(/^\s*\n/, '')
			.replace(/\n\s*$/, '')
		codeBlocks.push(content)
		return `%%CODEBLOCK_${codeBlocks.length - 1}%%`
	})

	// Split into lines for block processing
	const lines = markdown.split('\n')
	let html = ''
	let inList = false
	let listType = null
	let currentParagraph = []

	const closeList = () => {
		if (inList) {
			html += `</${listType}>\n`
			inList = false
			listType = null
		}
	}

	const closeParagraph = () => {
		if (currentParagraph.length > 0) {
			html += `<p>${processInline(currentParagraph.join(' '))}</p>\n`
			currentParagraph = []
		}
	}

	for (const line of lines) {
		// Process headers
		const headerMatch = line.match(/^(#+) (.*)/)
		if (headerMatch) {
			closeParagraph()
			closeList()
			const level = Math.min(headerMatch[1].length, 6)
			html += `<h${level}>${processInline(headerMatch[2])}</h${level}>\n`
			continue
		}

		// Process blockquotes
		if (line.startsWith('> ')) {
			closeParagraph()
			closeList()
			html += `<blockquote>${processInline(line.substring(2).trim())}</blockquote>\n`
			continue
		}

		// Process unordered lists
		const ulMatch = line.match(/^[*+-] (.*)/)
		if (ulMatch) {
			closeParagraph()
			if (!inList) {
				listType = 'ul'
				html += '<ul>\n'
				inList = true
			}
			html += `<li>${processInline(ulMatch[1])}</li>\n`
			continue
		}

		// Process ordered lists
		const olMatch = line.match(/^(\d+)\. (.*)/)
		if (olMatch) {
			closeParagraph()
			if (!inList) {
				listType = 'ol'
				html += '<ol>\n'
				inList = true
			}
			html += `<li>${processInline(olMatch[2])}</li>\n`
			continue
		}

		// Process horizontal rules
		if (/^(-{3}|\*{3}|_{3})$/.test(line)) {
			closeParagraph()
			closeList()
			html += '<hr>\n'
			continue
		}

		// Handle empty lines
		if (line.trim() === '') {
			closeParagraph()
			closeList()
			continue
		}

		// Collect paragraph lines
		currentParagraph.push(line.trim())
	}

	// Final cleanup
	closeParagraph()
	closeList()

	// Restore code blocks with proper escaping
	html = html.replace(/%%CODEBLOCK_(\d+)%%/g, (_, index) => {
		const content = codeBlocks[parseInt(index)].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
		return `<pre><code>${content}</code></pre>`
	})

	return html
}

function processInline(text) {
	// Basic HTML escaping
	let escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

	// Process inline elements
	const replacements = [
		// Images
		[/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">'],
		// Links
		[/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'],
		// Bold (double asterisks or underscores)
		[/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>'],
		// Italics (single asterisks or underscores)
		[/(\*|_)(.*?)\1/g, '<em>$2</em>'],
		// Inline code
		[/`([^`]+)`/g, '<code>$1</code>'],
	]

	replacements.forEach(([regex, replacement]) => {
		escaped = escaped.replace(regex, replacement)
	})

	return escaped
}
