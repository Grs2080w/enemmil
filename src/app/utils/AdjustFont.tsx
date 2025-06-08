import { RefObject } from "react"

interface Props {
	editorRef: RefObject<HTMLDivElement | null>
	setSize: (size: number) => void
	prevSizeRef: RefObject<number>
	newSize: number
}

const adjustFontSize = ({ editorRef, setSize, prevSizeRef, newSize }: Props) => {
	const editor = editorRef.current
	if (!editor) return

	setSize(newSize)
	const hasOverflow = editor.scrollHeight > editor.clientHeight

	if (hasOverflow) {
		setSize(prevSizeRef.current)
	} else {
		prevSizeRef.current = newSize
		setSize(newSize)
	}
}

export default adjustFontSize
