

TRUE = 1
FALSE = 0

1. Show content on screen, reset counts.
2. When the user has moved the finger off the right or left edge of the screen, count:
NT = number of touches (1..)
NS = number of stops (two+ consecutive moments when finger not moving), not counting the first press (0..)
TA = total sum of all angles (turns) (0..)
CS = change of speed (max speed - min speed) (screens per second) (0..)
TT = total time since displaying content to the user (seconds)
SE = screen edge at end, LEFT(true)=1, RIGHT(false)=0 


3. Calculate user confidence level
-> src/prototype.userConfidence.py
	userConfidence(NT,NS,TA,CS,TT,SE)
	[0;0.1) - TOTALLY FALSE
	[0.1;0.3) - FALSE
	[0.3;0.5) - MOSTLY FALSE
	[0.5;0.7) - HALF TRUE
	[0.7;0.9) - MOSTLY TRUE
	[0.9;1] - TRUE
