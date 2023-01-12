# judge-badge

Online judge rating SVG badges :D

You can see them in action on my [profile page](https://github.com/plasmatic1)!

## Usage

Simply create an image with an `src` tag of `https://mosesxu.ca/judge-badge/<judge-id>/<handle>`! For example, if I were to create a DMOJ badge in Markdown, I would do:

```
[![DMOJ Badge](http://mosesxu.ca/judge-badge/dmoj/plasmatic)](https://www.dmoj.ca/user/Plasmatic)
```

Currently available judges and their IDs are:

* DMOJ: ID is `dmoj`
* Codeforces: ID is `codeforces`
* AtCoder: ID is `atcoder`
* Topcoder: ID is `topcoder`

## Notes

Previously this was written in Python, but I wanted to have some fun in TS! (Also, there is no `badgen` alternative for Python)

This is also quite over-engineered, but hey that's just how things are sometimes.  Wanna make sure things are running buttery smooth :D

## TODO

* Bugtesting and unit tests? (mostly just for fetch rating functions)
* Find an empty background atcoder logo