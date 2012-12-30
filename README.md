downtime
========

Standardized JSON API to indicate downtime and EOL for apps and services.


On your status site or blog site (hopefully independent of your service!), put up a JSON file. To make the URL to this guessable, the file should be located at `/downtime`.

```json
{
  "service": "My awesome application",
  "url": "http://my.awesome.application/",
  "downtime": [
    {
      "title": "Server maintenance",
      "description": "optional description of what is going on",
      "info_url": "optional url of a blog post, etc",
      "type": "scheduled|unscheduled|eol", // default: scheduled
      "availability": "up|partial|down", // default: down
      "urls": "url pattern (regex) of affected services, possibly an array",
      "starts_at": "UTC timestamp", // required
      "ends_at": "UTC timestamp" // if not given, can assume 1 hour
    }
    // moar
  ]
}
```

The file shouldn't contain events in the past (current time > `ends_at`).

Here are some use cases for this:

* A tool that periodically checks downtime information for services you use,
  indicating any upcoming downtime in your calendar or notify you by email or OS X notification.
* When your app uses an API the provides downtime information, you can possibly 
  queue calls to that API for later if there currently is downtime.

I very much welcome any input and discussion on this. Ideally, we could have a site where
you can subscribe to the downtime info of various sites, and get it as RSS/iCal/push notification/whatever else we come up with.

This idea/site is licensed under the terms of the MIT license.
(c) 2012 Thomas Fuchs
