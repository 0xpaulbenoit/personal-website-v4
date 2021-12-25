---
title: "Searching in XSOAR"
date: '2021-12-26'
coverImage: "/blog/search.jpg"
ogImage:
  url: "/blog/search.jpg"
---

# Searching in XSOAR

Searching for incidents in XSOAR (formerly called Demisto) can be a resource-intensive process. If you're not careful when automating searching, it's easy to accidentally max out the memory on your XSOAR instance, freezing the UI until you restart it. This is something I had to learn through experimentation since the documentation is sparse.

There are three things that influence searching efficiency:

1. **Time is the best way to limit searches**. By default, XSOAR indexes incidents based on the *created* field. You can filter for it using the *fromDate* and\or *toDate* parameters. All-time searches are the most demanding resource-wise.
2. The *getIncidents* command does not spawn a new docker container, so it’s faster than the *GetIncidentsByQuery* script given the same query.
3. Using the *query* parameter in getIncidents means all the other parameters (including fromDate and toDate) will be ignored.
    1. The query parameter is necessary if we are searching for custom fields.

Given those facts, here is what you should use for searching:

![Post to cybersecurity subreddit](/blog/search2.png)

```python
# getIncidents example searching all time
incidents = demisto.executeCommand('getIncidents', {'query': f'type:CustomIncidentType and status:Active'})[0]['Contents']['data']
for i in incidents:
    custom_fields = i.get('CustomFields')
    custom_field_1 = custom_fields.get('customfield1')

# GetIncidentsByQuery example searching a time range with custom fields
res = demisto.executeCommand('GetIncidentsByQuery', {
    'query': f'customfield1:True and -category:job',
    'fromDate': first_day,
    'toDate': last_day,
    'populateFields': 'id,customfield2'
    })[0]['Contents']
    incidents = json.loads(res)
    for i in incidents:
    incident_id = i.get('id')
    custom_field_2 = custom_fields.get('customfield2')
```

Note that in the above examples *getIncidents* requires specifying which fields are custom vs default while *GetIncidentsByQuery* does not

### Extra Gotchas

Watch out for the limit on the *getIncidents* command, which is set to 100 by default. You’ll have to specify a higher limit in a parameter if you want to return data from more incidents.