# Date Nullable Time
Removes time from datetime properties when the time is 00:00:00.

The code is short enough that i really shouldn't need to say more. With this implementation, you could never have datetime properties that occur at 00:00:00, but in my life, this is rare enough to not be of concern. It would indeed be more neat if you could have your own kind of field, without that limitation, but I believe this to be impossible as of now. 

## Title Date Changer
I was in the process of developing another plugin that also worked with date fields, that automatically changed an ISO date in the file title to follow a date property. Problem is, that plugin would have problems not ruining this plugin, as both listen for date field changes, and they want to either change the file name or change the frontmatter. To resolve this issue, I just baked that plugin into this plugin, with defaults that won't change anythin unless you alter settings. 

If anyone knows of a better way to do this I'm all ears, but currently I believe it to be impossible to resolve properly without just having both plugins be the same plugin, and listen for the same event. The problem is also that the potential Title Date Changer plugin should also work on datetime fields, meaning it could rename the file before Date Nullable Time had a chance to run. 
