# Date Nullable Time
Removes time from datetime properties when the time is 00:00:00.

The code is short enough that i really shouldn't need to say more. With this implementation, you could never have datetime properties that occur at 00:00:00, but in my life, this is rare enough to not be of concern. It would indeed be more neat if you could have your own kind of field, without that limitation, but I believe this to be impossible as of now. 