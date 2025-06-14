"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Combobox } from "./components/Combobox"
import UpdateSize from "./utils/UpdateSize"
import onpaste from "./utils/OnPaste"
import adjustFontSize from "./utils/AdjustFont"
import onInput from "./utils/OnInput"

export default function Home() {
	const [size, setSize] = useState(16)
	const [font, setFont] = useState("")
	const [wordCount, setWordCount] = useState(0)
	const [commaCount, setCommaCount] = useState(0)
	const [dotCount, setDotCount] = useState(0)
	const [semicommaCount, setSemicommaCount] = useState(0)
	const [twoDotsCount, setTwoDotsCount] = useState(0)

	const [hasPasted, setHasPasted] = useState(false)

	const editorRef = useRef<HTMLDivElement>(null)
	const prevSizeRef = useRef(size)
	const prevFontRef = useRef(font)

	const lines = Array.from({ length: 30 })

	const handleAdjust = useCallback(() => {
		const editor = editorRef.current
		if (!editor) return

		if (editor.scrollHeight > editor.clientHeight) {
			adjustFontSize({ editorRef, setSize, prevSizeRef, newSize: size - 1 })
		} else {
			adjustFontSize({ editorRef, setSize, prevSizeRef, newSize: size + 1 })
		}
	}, [size, setSize])

	useEffect(() => {
		if (prevFontRef.current === font) return
		if (hasPasted === false) return

		prevFontRef.current = font
		UpdateSize({ currentSize: size, minSize: 11, maxSize: 25, step: 1, editorRef, setSize })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [font])

	useEffect(() => {
		const onResize = () => {
			UpdateSize({ currentSize: size, minSize: 11, maxSize: 25, step: 1, editorRef, setSize })
		}

		window.addEventListener("resize", onResize)
		return () => {
			window.removeEventListener("resize", onResize)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handleAdjust])

	useEffect(() => {
		document.documentElement.style.setProperty("--print-font-size", `${size - 1}px`)
	}, [size])

	return (
		<div className="flex flex-col min-h-screen items-center justify-center pt-50 pb-15">
			<div style={{ borderColor: "var(--border-line-color)" }} id="sheet" className="border-2 h-[80vw] aspect-[17/19] relative">
				{lines.map((line, index) => (
					<div className="relative" key={index}>
						<div className="absolute left-[-40] text-zinc-400 text-right font-bold w-[40px] p-2">{(index + 1).toString()}</div>

						<div style={{ borderColor: "var(--border-line-color)" }} key={index} id="line" className="w-full border-b-2 text-5xl pl-3 pt-2"></div>
					</div>
				))}

				<div
					ref={editorRef}
					id="text"
					className="absolute inset-0 px-1 leading-[calc(90vh/30)] outline-none  z-10"
					contentEditable={"plaintext-only"}
					suppressContentEditableWarning={true}
					style={{ fontSize: `${size}px`, fontFamily: font, color: "var(--text-color)" }}
					onInput={() => onInput({ setWordCount, setCommaCount, setDotCount, setSemicommaCount, setHasPasted, editorRef, setTwoDotsCount })}
					onPaste={(e) => onpaste({ setHasPasted, setSize, editorRef, setWordCount, setCommaCount, setDotCount, setSemicommaCount, setTwoDotsCount, size, e })}
				></div>
			</div>

			<div style={{ backgroundColor: "var(--downbar-background)" }} id="controls" className="flex flex-wrap justify-between gap-3 w-full max-w-[72vw] my-5  p-3 rounded-xl sticky bottom-5 z-50 shadow-neutral-700 drop-shadow-2xl">

				<div className="flex gap-2 grow justify-center items-center">
					<div className="flex items-center gap-2">
						<p style={{ backgroundColor: "var(--downbar-foreground)" }} className="text-xl font-bold rounded-xl p-3">
							Word Count: {wordCount}
						</p>
					</div>
					<div style={{ backgroundColor: "var(--downbar-foreground)" }} className="flex items-center gap-2 text-xl font-bold rounded-xl p-2">
						<p className="">{commaCount}</p>
						<p className="font-bold text-zinc-500 text-3xl">,</p>
					</div>
					<div style={{ backgroundColor: "var(--downbar-foreground)" }} className="flex items-center gap-2 text-xl font-bold rounded-xl p-2">
						<p className="">{dotCount}</p>
						<p className="font-bold text-zinc-500 text-2xl">.</p>
					</div>
					<div style={{ backgroundColor: "var(--downbar-foreground)" }} className="flex items-center gap-2 text-xl font-bold rounded-xl p-2">
						<p className="">{semicommaCount}</p>
						<p className="font-bold text-zinc-500 text-2xl">;</p>
					</div>
					<div style={{ backgroundColor: "var(--downbar-foreground)" }} className="flex items-center gap-2 text-xl font-bold rounded-xl p-2">
						<p className="">{twoDotsCount}</p>
						<p className="font-bold text-zinc-500 text-2xl">:</p>
					</div>
				</div>
				<div className="flex justify-center items-center gap-5 grow">
					<div className="flex items-center gap-2">
						<p style={{ backgroundColor: "var(--downbar-foreground)" }} className="text-xl font-bold rounded-xl p-2">
							Font Size: {size}
						</p>
						<Button
							style={{ backgroundColor: "var(--downbar-button-background)", color: "var(--downbar-button-text)"}}
							className="hover:cursor-pointer border-1 button-downbar"
							onClick={() => {
								if (size - 1 < 11) return
								setSize(size - 1)
							}}
						>
					
							<Minus />
						</Button>
						<Button style={{ backgroundColor: "var(--downbar-button-background)", color: "var(--downbar-button-text)" }} className="hover:cursor-pointer border-1 button-downbar" onClick={() => adjustFontSize({ editorRef, setSize, prevSizeRef, newSize: size + 1 })}>
					
							<Plus />
						</Button>
					</div>
					<div>
						<Combobox value={font} setValue={setFont} />
					</div>
				</div>
			</div>
		</div>
	)
}
