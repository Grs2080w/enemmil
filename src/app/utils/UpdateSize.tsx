import { RefObject } from "react"

export type AdjustOptions = {
	currentSize: number
	minSize?: number
	maxSize?: number
	step?: number
	editorRef: RefObject<HTMLDivElement | null>
	setSize: (size: number) => void
}

export default function UpdateSize({ currentSize, minSize = 11, maxSize = 128, step = 1, editorRef, setSize }: AdjustOptions) {
	let size = currentSize

	if (!editorRef) return

	while (editorRef.current!.scrollHeight > editorRef.current!.clientHeight && size > minSize) {
		size -= step
		editorRef.current!.style.fontSize = `${size}px`
	}

	while (editorRef.current!.scrollHeight <= editorRef.current!.clientHeight && size < maxSize) {
		size += step
		editorRef.current!.style.fontSize = `${size}px`

		if (editorRef.current!.scrollHeight > editorRef.current!.clientHeight) {
			//size -= step
			editorRef.current!.style.fontSize = `${size}px`
			break
		}
	}

	setSize(size)
}
