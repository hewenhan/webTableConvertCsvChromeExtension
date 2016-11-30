# webTableConvertCsv.crx
- `version v1.0.0`
- `Author: Blind Holmes`

## Introduction
- This is a tools of Chrome or Chromium Extension
It will scan all the `<table>` tag of `HTML ELEMENT` on the currently web page,and create one `BUTTON` every `ELEMENT`

click it,then download table

```flow

start=>start: start

visit=>operation: visit
login=>operation: login
requestAuth=>operation: requestAuth
selectMenuVisit=>operation: selectMenuVisit

processUserAuthMenu=>subroutine: processUserAuthMenu
processUserOwnerInfo=>subroutine: processUserOwnerInfo

alertAuthNotEnough=>inputoutput: alertAuthNotEnough
showUserOwnInfo=>inputoutput: showUserOwnInfo
redirectWelcomePage=>inputoutput: redirectWelcomePage
showUserAuthMenu=>inputoutput: showUserAuthMenu

checkUserAccessAuth=>condition: checkUserAccessAuth

end=>end: end

start->visit->login->redirectWelcomePage->processUserAuthMenu
processUserAuthMenu->showUserAuthMenu->selectMenuVisit->checkUserAccessAuth
checkUserAccessAuth(no)->alertAuthNotEnough(right)->redirectWelcomePage
checkUserAccessAuth(yes)->processUserOwnerInfo->showUserOwnInfo->end

```
