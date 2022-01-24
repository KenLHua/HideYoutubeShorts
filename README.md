# HideYoutubeShorts
Hide videos from subscription box that are shorts

[x] Hide videos with titles containing "#shorts"

[x] Hide videos that are of length <60 seconds

[x] Hide videos with descriptions containing "#shorts"

Notes 
* Only hides videos within https://www.youtube.com/feed/subscriptions, other videos found in search or anywhere else isn't touched
* Tested only with list view
* Only made for chromium browsers

Issues

* Youtube lazy loads video duration, if script attempts to filter when no time is available, filter by time will be skipped
