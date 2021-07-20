---
title: "CyberQualify - Cybersecurity Interview Platform "
excerpt: ""
date: '2021-06-10'
coverImage: "/blog/cyberqualify.jpg"
ogImage:
  url: "/blog/cyberqualify.jpg"
---


Over the past year, I built CyberQualify, a cybersecurity interview platform. It allowed companies to give online CTF-style skills assessments to cybersecurity job candidates.

### Problem
Hiring in cybersecurity sucks.
Getting a job in cybersecurity sucks.
They should suck less.

From a company's perspective, it's [hard to find talented people in cybersecurity](https://www.isc2.org/News-and-Events/Press-Room/Posts/2019/11/06/ISC2-Finds-the-Cybersecurity-Workforce-Needs-to-Grow--145#:~:text=2020-,(ISC)%C2%B2%20Finds%20the%20Cybersecurity%20Workforce%20Needs%20to%20Grow%20145,and%20Better%20Defend%20Organizations%20Worldwide&text=65%25%20of%20organizations%20report%20a,concern%20among%20respondents%20(36%25)). It's a new field, so candidates rarely have the formal credentials that companies are looking for. Screening candidates based on their resume is the standard solution. Unfortunately, it means companies miss out on the candidates who have the technical skills but don't look as good on paper. They also run into the inverse problem, where candidates pass the resume screen who look good on paper but don't have the technical skills. Those candidates go on to interview with engineers, wasting their valuable time.

### Solution

To make cybersecurity hiring more effective, I created CyberQualify. It allowed companies to give online Capture-The-Flag style skills assessments to cybersecurity candidates.

The skills assessments were work samples, small pieces reflective of the work done as part of the job. If a candidate passed the assessment, then you know the candidate can do the job. 

- Judge penetration testers on how well they can exploit vulnerable systems.
- Judge incident responders on how well they can find evil in event logs.
- Hire candidates based on who can actually perform the job the best... rather than who looks good on paper.

#### Technical Details

Taking a CyberQualify assessment is a similar experience to playing a CTF on [CTFd](https://ctfd.io/). There are a few key differences though. CyberQualify skills assessments have a unique link for each candidate and are timed by default. You can have a challenge with a single correct answer, or ask open-ended questions.

Some of the sample challenges involved exploiting vulnerable web applications. For security, I ran each vulnerable web app in a docker container on a separate server from the main one

The hardest challenges to setup were for penetration testing. I didn't want to expose legitimately vulnerable systems to the Internet. The simple option would be to require the candidates to connect to a VPN like HackTheBox, but I know that would be too much friction for some people. Instead, I decided to spin up a Kali VM for each candidate when they started an assessment. I gave each candidate a unique login and used Apache Guacamole to  allow them to access the VM through their browser. The Guacamole server was the only thing Internet-facing.

#### Hope

I had high conviction that the idea would work. I thought I had found a gap in the market.

This idea already exists for software engineers. There are dozens of coding assessment platforms that screen software engineers with data structure or algorithm puzzles. Collectively, these platforms make tens of millions of dollars per year. If there was a market for those solutions, surely there would be space for something similar for cybersecurity?

Another thing that encouraged me was that companies were already creating their own versions of CTF-style skills assessments. Some use CTF platforms. I've even seen a couple using Google Docs to send the assessments. All I needed to do was convince companies considering this to outsource the job to me, someone who has spent far more time tackling the problem. It would be cheaper, better, and faster.

### Sales

![sales is hard](/blog/sales-is-hard.jpg)

Developing CyberQualify took over my nights and weekends for months. Selling was even harder in some ways. I have much more experience making things vs selling them.

First, I reached out to my friends at other cybersecurity companies to see if their bosses were interested. Some companies already had a CTF-style skills assessment in place. Others weren't interested in it.

Then I cold emailed 100 companies that were hiring for technical cybersecurity roles. Each cold email was personalized to the recipient and explained how CyberQualify could help them. Sometimes I would spend 20min researching a person and writing an email only for the email to bounce. That was disheartening.

Over the 100, my cold email skills improved, which improved my response rate. Here are some things I learned:

- Set a personal picture in Google Workspace. Gmail users will see it and know you're a real human and not some bot
- Include the target company name in the email subject
- Include a professional-looking signature with a logo and a link to the website
- And of course, personalize the email

There's a fine line between sales and spam. Largely, it depends on how the email is received. Some people consider all unsolicited communication spam. To them, I'm a spammer. Other people were delighted to talk with me over Zoom. In order to reach the second group, some emails will always end up sent to the first group.


Out of the 100 cold emails, 8 people responded.  
4 people agreed to have a quick zoom call  
3 people actually joined the zoom call that they agreed to  
2 people said they thought they could use CyberQualify after the call  
0 people used CyberQualify  

TL;DR
Enterprise sales is hard

### Failure

Like so many other people making new things, I failed rule number 1 — I ended up making something no one wanted, or at least it seems that way.

On the upside, overdeveloping the product meant that I learned a ton about web app development. On to the next one.