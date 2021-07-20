---
title: "How to Migrate from AWS S3 to DigitalOcean Spaces in Rails 6"
excerpt: ""
date: '2020-04-20'
coverImage: "/blog/remotecyberwork.jpg"
ogImage:
  url: "/blog/remotecyberwork.jpg"
---


In November 2020, I created [RemoteCyberWork](http://remotecyberwork.com), a job board for remote cybersecurity jobs. 

### Background

I've spent most of my career working remotely. When I graduated college, I made sure to negotiate the ability for my job to be fully-remote. I love remote work. I think it will change the world.

The pandemic brought remote work into the mainstream, but job boards haven't caught up yet. They're still focused on "jobs within 50 miles of you" or "jobs in X location." Searching for full-time remote jobs can be annoying.

![town of remote oregon](/blog/remote-oregon.png)

I never knew there were so many jobs based out of the town of Remote, Oregon!

There are some dedicated remote job boards out there but they don't allow you to filter for cybersecurity jobs. Or they do, but the amount of jobs posted is pretty slim.

### Solution

To make the job search easier, I decided to make a single place where people could search for remote jobs in cybersecurity. It took me about 10 days to make an MVP. 

To get the list of jobs, I scraped existing job boards and individual career sites. This was the hardest part, since different websites present the jobs in different formats, which means a lot of tedious work. I always linked back to the original site when showing the job post on my site. I was trying to make people's lives easier, not steal traffic from other companies.

Then I added searching and tagging. Each job gets tagged with a predefined list of words that are associated with cybersecurity. That way people can filter for *penetration testing* or *AWS*.

### Marketing

Simply putting a website on the Internet isn't enough to get views anymore. No one cares. They have to discover it from somewhere. 

I decided to use Reddit to promote RemoteCyberWork. Promoting yourself on Reddit is a dangerous game though. Sometimes moderators ban you. Other times the Reddit hive mind can turn on you. Despite the risks, it turned out well for me. My post was at the top of /r/cybersecurity for that day, and received a bunch of positive feedback. That day I hit my peak traffic of over 1,200 users.

![Post to cybersecurity subreddit](/blog/reddit.png)

I knew that traffic would drop off after the day that I posted, so I added an email capture box. People could subscribe to get weekly job updates, which would link back to posts on RemoteCyberWork.

### Monetization

Almost all niche job boards make money in the same way. They charge for job posts. Then they upcharge to highlight a job post or feature it in a mailing list or pin it to the top of the page. I saw no reason to deviate for my job board, so I added a paid option to post a highlighted job to RemoteCyberWork. It stays pinned to the top of the page for a week.

No one has paid for a job post yet. According to my analytics, that's because no one is even viewing the "Post a Job" page.

I think the site needs more traffic. I invested some time into improving the SEO. Maybe in 6 months that will pay off. SEO takes a while to influence anything, but it compounds.

### Automation

At first, I was hand-verifying each job before posting it to the front page of RemoteCyberWork. It was important to find bugs. Sometimes jobs would be added that weren't related to cybersecurity or were only temporarily remote due to the pandemic.

Now the site is almost entirely automated. It's still not making any money, but it might some day. At least people are benefiting from it, and it doesn't cost much money to maintain.