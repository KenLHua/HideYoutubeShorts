# HideYoutubeShorts
<img src="https://github.com/KenLHua/HideYoutubeShorts/blob/master/images/logo.png" width=150 height=90>


How to use unpublished chrome extensions:
1. Follow https://developer.chrome.com/docs/extensions/mv3/getstarted/ under **Load an unpacked extension** to enable developer mode
2. Download source code
3. Load as unpacked extension, find the folder HideYoutubeShorts and select it


What it does:

Hides videos from subscription box that are shorts


[x] Hide videos with titles containing "#shorts"

[x] Hide videos that are of length <60 seconds

[x] Hide videos with descriptions containing "#shorts"


Notes 
* Only hides videos within https://www.youtube.com/feed/subscriptions, other videos found in search or anywhere else isn't touched
* Tested only with list view
* Only made for chromium browsers

Issues

[x] FIXED - Youtube lazy loads video duration, if script attempts to filter when no time is available, filter by time will be skipped

[] Navigation to subscriptions from homepage doesn't trigger filters
