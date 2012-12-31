downtime
========

downtime is a standardized JSON API that lists recent, current and upcoming periods of
maintenance or downtime for apps and services, both scheduled and unscheduled.

Wait, what? Here's why this is a cool thing:

For you:
* Use the machine-readable format to easily convert into calendar events, so you'll
  see all upcoming downtime of services you use in your calendar.
* Easily editable because it's JSON. No XML wrestling, or weird formats like iCalendar
  that don't really fit the purpose.

For your apps:
* When your app uses an API that provides downtime information, you could
  queue calls to that API for later if there currently is downtime.
* While unexpected downtime occurs, keep you informed of the current status,
  which in case you connect to an API you can show to your users. For example,
  if you use Freckle's API in your app, and Freckle is down for maintenance, you
  can let your users know about that directly in your app—avoiding extra support
  costs and useless debugging.
* Whip up a html page in your apps backend that shows downtime information for all the
  3rd-party apps you use, on one page!

File format
-----------

On your status site or blog site (hopefully independent of your service!), 
put up a JSON file.

To make the URL to this guessable, the file should be located at `/downtime.json`
(this is highly recommended but not a strict requirement).

The file must be a valid JSON file adhering to the following format:

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
      "urls": [
        "url pattern (regex) of affected service"
        // can be more than one
      ],
      "starts_at": "ISO8601 UTC timestamp", // required
      "ends_at": "ISO8601 UTC timestamp", // if not given assume open-ended
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
When you create or generate this file, try to stick to these rules of thumb as well:
* Use ISO8601 timestamps in the UTC timezone only to avoid confusion
* Keep descriptions short and to the point. Remember that non-technical people should be able
  to understand them as well.
* The file shouldn't contain events far in the past (maybe keep info for 1-2 months, but no longer).
* If you don't know an "ends_at" time, take an educated guess. Keep the time updated if it takes longer.

**This format is not final, and open to discussion. Please contribute in the issues.**

Examples in the wild
--------------------

* Freckle http://letsfreckle.com/downtime.json
* DNSimple https://dnsimple.com/downtime.json

If you provide downtime information, add your service to `services.json` 
so we and others can implement apps that fetch downtime information and 
provide useful services based on it.

This repository comes with a `downtime.js` and `downtime.html` example file that shows
how you could use your `downtime.json` file to show a status page. **This example is a
work in progress.**

Project goals
-------------

* As simple as possible, with a single file that can be hand-edited as well as generated. 
  When you experience downtime, you don't have time to mess around with complicated syntax.
* Use good defaults and don't use stuff that is academic. Keep it real-world, fast,
  and most importantly simple. 
* Be able to easily use the information for a status site for your app or service,
  with a template that has zero external references or requirements (except for JavaScript
  being enabled), and works in as many browsers as possible. Just HTML & the JSON data.  
* Create a free and OSS service that provides a combined HTML view and an iCalendar feed
  for services you use (so you can put planned maintenance windows in your calendar!)

Todos
-----

* Finish HTML example and make it more robust.
* More comprehensive API for downtime.js to more easily do your own downtime pages.
* Create a downtime Ruby gem that can read and generate the JSON file, and can convert it 
  into an iCalendar feed
* A public site that allows you to subscribe to sets of downtime-enabled sites,
  viewing them all at once and in at least HTML, JSON and iCalendar formats.

Hey, it's alpha—contribute!
---------------------------

I very much welcome any input and discussion on this. 

My vague goal is to have a site where you can subscribe to the downtime info of various apps, 
and get it as RSS/iCal/push notifications.

License
-------

downtime is licensed under the terms of the MIT license. (c) 2012 Thomas Fuchs
