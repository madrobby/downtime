downtime
========

downtime is a standardized JSON API to list current and upcoming downtime for apps and services,
both scheduled and unscheduled.

Wait, what? Here's why this would be cool thing:

* A tool that periodically checks downtime information for services you use,
  indicating any upcoming downtime in your calendar or notify you by email or OS X notification.
* When your app uses an API the provides downtime information, you can possibly 
  queue calls to that API for later if there currently is downtime.
* Inform you far in advance when an older API version is scheduled to be EOL'd.
* While unexpected downtime occurs, keep you informed of the current status.

File format
-----------

On your status site or blog site (hopefully independent of your service!), put up a JSON file. To make the URL to this guessable, the file should be located at `/downtime.json`.

```javascript
{
  "service": "My awesome application",
  "url": "http://my.awesome.application/",
  // if downtime.json is generated dynamically, the updated_at timestamp 
  // should be the current date/time
  "updated_at": "ISO8601 UTC timestamp",
  "downtime": [
    {
      "title": "Server maintenance",
      "description": "text or HTML (?), optional description of what is going on",
      "info_url": "optional url of a blog post, etc",
      "type": "scheduled|unscheduled", // default: scheduled
      "availability": "up|partial|down", // default: down
      "urls": "url pattern (regex) of affected services, possibly an array",
      "starts_at": "ISO8601 UTC timestamp", // required
      "ends_at": "ISO8601 UTC timestamp", // if not given, can assume 1 hour
      "updated_at": "ISO8601 UTC timestamp",
      "log": [ // optional, useful to indicate status while repair is going on
        { 
           "timestamp": "ISO8601 UTC timestamp",
           "description": "text or HTML info about current repair status, etc"
        } // etc
      ]
    }
    // moar
  ]
}

// note: actual JSON doesn't support comments
```

The file shouldn't contain events far in the past (maybe keep info for 1-2 months, but no longer).

Examples in the wild
--------------------

* Freckle http://letsfreckle.com/downtime.json
* DNSimple https://dnsimple.com/downtime.json

If you provide downtime information, add your service to `services.json` so we and others can implement apps to fetch downtime information and provide useful services based on it.

Project goals
-------------

* As simple as possible, with a file that can be hand-edited. When you have a downtime,
  you don't have time to mess around with complicated systems.
* Use good defaults and don't use stuff that is academic. Keep it real-world, fast
  and most importantly simple. 
* A single text file should contain all information for your app or service
* Be able to easily use the information for a status site for your app or service,
  with a template that has zero external references or requirements (except for JavaScript
  being enabled), and works in as many browsers as possible. Just HTML & the JSON data.  
* Create a free and OSS service that provides a combined HTML view and an iCalendar feed
  for services you use (so you can put planned maintenance windows in your calendar!)

Todos
-----

* Finish HTML example and make it more robust
* More comprehensive API for downtime.js to more easily do your own downtime pages
* Add a public site that allows you to subscribe to sets of downtime-enabled sites,
  viewing them all at once and in at least HTML, JSON and iCalendar formats.

Hey, it's alpha—contribute!
---------------------------

I very much welcome any input and discussion on this. Ideally, we could have a site where
you can subscribe to the downtime info of various sites, and get it as RSS/iCal/push notification/whatever else we come up with.

Blah
----

This idea/site is licensed under the terms of the MIT license.
(c) 2012 Thomas Fuchs
