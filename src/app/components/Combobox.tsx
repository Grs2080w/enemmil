"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const cssFonts = [
	{
		value: "Arial, sans-serif",
		label: "Arial",
	},
	{
		value: "'Helvetica Neue', Helvetica, sans-serif",
		label: "Helvetica",
	},
	{
		value: "'Times New Roman', serif",
		label: "Times New Roman",
	},
	{
		value: "Times, serif",
		label: "Times",
	},
	{
		value: "Georgia, serif",
		label: "Georgia",
	},
	{
		value: "Garamond, serif",
		label: "Garamond",
	},
	{
		value: "Verdana, sans-serif",
		label: "Verdana",
	},
	{
		value: "Tahoma, sans-serif",
		label: "Tahoma",
	},
	{
		value: "Trebuchet MS, sans-serif",
		label: "Trebuchet MS",
	},
	{
		value: "Courier New, monospace",
		label: "Courier New",
	},
	{
		value: "Courier, monospace",
		label: "Courier",
	},
	{
		value: "'Lucida Console', monospace",
		label: "Lucida Console",
	},
	{
		value: "'Lucida Sans Unicode', sans-serif",
		label: "Lucida Sans Unicode",
	},
	{
		value: "'Comic Sans MS', cursive, sans-serif",
		label: "Comic Sans MS",
	},
	{
		value: "'Brush Script MT', cursive",
		label: "Brush Script MT",
	},
	{
		value: "'Lucida Handwriting', cursive",
		label: "Lucida Handwriting",
	},
	{
		value: "'Segoe Script', cursive",
		label: "Segoe Script",
	},
	{
		value: "cursive",
		label: "Genérica: Cursive",
	},
	{
		value: "'Segoe UI', sans-serif",
		label: "Segoe UI",
	},
	{
		value: "Impact, sans-serif",
		label: "Impact",
	},
	{
		value: "sans-serif",
		label: "Genérica: Sans-serif",
	},
	{
		value: "serif",
		label: "Genérica: Serif",
	},
	{
		value: "monospace",
		label: "Genérica: Monospace",
	},
	{
		value: "system-ui",
		label: "System UI",
	},
	{
		value: "-apple-system",
		label: "Apple System",
	},
]

export function Combobox({ value, setValue }: { value: string; setValue: (value: string) => void }) {
	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between hover:cursor-pointer" style={{ fontFamily: value }}>
					{value ? cssFonts.find((fonts) => fonts.value === value)?.label : "Select font..."}
					<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search font..." />
					<CommandList>
						<CommandEmpty>No font found.</CommandEmpty>
						<CommandGroup>
							{cssFonts.map((fonts) => (
								<CommandItem
									key={fonts.value}
									value={fonts.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}
									style={{ fontFamily: fonts.value }}
								>
									<CheckIcon className={cn("mr-2 h-4 w-4", value === fonts.value ? "opacity-100" : "opacity-0")} />
									{fonts.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
