import { RefObject } from "react"
import UpdateSize from "./UpdateSize"

interface Props {
	setHasPasted: (value: boolean) => void
	setSize: (value: number) => void
	e: React.ClipboardEvent<HTMLDivElement>
	editorRef: RefObject<HTMLDivElement | null>
	setWordCount: (count: number) => void
	setCommaCount: (count: number) => void
	setDotCount: (count: number) => void
	setSemicommaCount: (count: number) => void
	setTwoDotsCount: (count: number) => void
	size: number
}

const onpaste = ({ setHasPasted, setSize, editorRef, setWordCount, setCommaCount, setDotCount, setSemicommaCount, setTwoDotsCount, size, e }: Props) => {
	e.preventDefault()
	setHasPasted(true)

	const text = e.clipboardData.getData("text/plain")
	if (!text) return
	const withoutLeadingSpace = text.replace(/^\s*[\r\n]/gm, "")
	editorRef.current!.innerText = editorRef.current!.innerText + withoutLeadingSpace

	setWordCount(editorRef.current?.innerText.split(" ").length || 0)
	if (editorRef.current?.innerText) {
		const comma = editorRef.current.innerText.match(/,/g)
		const commaCoount = comma ? comma.length : 0
		setCommaCount(commaCoount)

		const dot = editorRef.current.innerText.match(/\./g)
		const dotCount = dot ? dot.length : 0
		setDotCount(dotCount)

		const semicolon = editorRef.current.innerText.match(/;/g)
		const semicolonCount = semicolon ? semicolon.length : 0
		setSemicommaCount(semicolonCount)

		const twoDots = editorRef.current.innerText.match(/:/g)
		const twoDotsCount = twoDots ? twoDots.length : 0
		setTwoDotsCount(twoDotsCount)
	}

	if (text.length < 1000) return
	UpdateSize({ currentSize: size, minSize: 11, maxSize: 50, step: 1, editorRef, setSize })
}

export default onpaste
