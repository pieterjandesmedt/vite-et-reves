---
title: "{{ replace .Name "-" " " | replaceRE "^[0-9]+ [0-9]+ [0-9]+ " "" | title }}"
date: {{substr .Name 0 10}}T{{ dateFormat "15:04:05-07:00" .Date }}
publishdate: {{substr .Name 0 10}}T{{ dateFormat "15:04:05-07:00" .Date }}
image: ""
author: "Pieter Jan"
gpx: ""
summary: ""
---

`From: `<br/>
`To: `

