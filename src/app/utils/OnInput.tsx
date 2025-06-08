import { RefObject } from "react"

interface Props {
	setWordCount: (count: number) => void
	setCommaCount: (count: number) => void
	setDotCount: (count: number) => void
	setSemicommaCount: (count: number) => void
	setHasPasted: (hasPasted: boolean) => void
	editorRef: RefObject<HTMLDivElement | null>
}

export default function onInput({ setWordCount, setCommaCount, setDotCount, setSemicommaCount, setHasPasted, editorRef }: Props) {
	if (!editorRef) return
	
    setHasPasted(false)

	if (!editorRef.current?.innerText) return

	if (editorRef.current?.innerText !== "") {
		setWordCount(0)
		return
	} else {
		setWordCount(editorRef.current?.innerText.trim().split(" ").length || 0)
	}

	const comma = editorRef.current.innerText.match(/,/g)
	const commaCoount = comma ? comma.length : 0
	setCommaCount(commaCoount)

	const dot = editorRef.current.innerText.match(/\./g)
	const dotCount = dot ? dot.length : 0
	setDotCount(dotCount)

	const semicolon = editorRef.current.innerText.match(/;/g)
	const semicolonCount = semicolon ? semicolon.length : 0
	setSemicommaCount(semicolonCount)
}
