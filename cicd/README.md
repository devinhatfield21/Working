#==============================================================================#
# ** Roku - OV Framework - v1.0 **
# Title: Preprocessor Scripts Setup Guide
# Author: AT&T
# Date: 2018-Dec-20
# License: Copyright 2018 AT&T
#==============================================================================#

# Dependencies:
    - [roku-deploy](https://www.npmjs.com/package/roku-deploy)

# One time installation:
1. Install Node Version Manager - https://github.com/creationix/nvm
	- [MacOSX] curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash
	- [Windows] https://github.com/coreybutler/nvm-windows
	
2. Install [Node.js](http://nodejs.org): (>= v11.4.0)
	- [MacOSX] Run the following to use Node Version Manager (which allows you to run multiple versions of node):
	`nvm install stable`
	`nvm use stable`
    `nvm install iojs`
	`nvm ls`
	- [Windows] 'nvm install latest 32' //Install 32-bit arch because 64-bit missing the 'node-modules' data
		In case of missing the 'node-modules'data, download a release from Node.js then copy the 'node-modules' folder over.
		Rename the 'Node32.exe' to 'Node.exe' file	

3. Install [npm] dependencies
    `npm install`

# 
4. 
