; F11 - Add 1 of each
; Shift + F11 - Remove 1 of each
; F10 - Add all items

leftX := 805 ; Left Column plus button X cord
rightX := 1340 ; Reft Column plus button X cord
startY := 355 ; Row start Y cord
differenceY := 29 ; Distance between rows
allOffset := 95 ; Distance between Plus and All buttons
minusOffset := 40 ; Distance between Plus and Minus buttons

leftRowCount := 15 ; Rows in the left column
rightRowCount := 7 ; Rows in the right column

homeX := 940
homeY := 845

#If WinActive("ahk_exe Phasmophobia.exe")
F10::
	global allOffset
	AddItems(allOffset)
return
#If

#If WinActive("ahk_exe Phasmophobia.exe")
Shift & F11::
	global minusOffset
	AddItems(minusOffset)
return
#If

#If WinActive("ahk_exe Phasmophobia.exe")
F11::
	AddItems(0)
return
#If

AddItems(offset) {
	global leftX, rightX, startY, differenceY, leftRowCount, rightRowCount, homeX, homeY
	ClickLoop(leftRowCount, leftX + offset, startY, differenceY) ; left row
	ClickLoop(rightRowCount, rightX + offset, startY, differenceY) ; right row
	MouseMove homeX, homeY ; Move cursor to back button
	return
}

ClickLoop(row, normX, normY, yOff) {
	loopCount = 0
	While loopCount < row {
		y := normY + (yOff * loopCount)
		Click %normX%, %y%
		loopCount += 1
		sleep 100 ; Going too fast is bad
	}
	return
}