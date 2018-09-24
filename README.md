# Flindr - find flickr fotos fast

Mostly, I can't find things. This is a way to sort of kinda try to help me do
that a wee bit better.

flinder - *noun*
>     A small piece or fragment; a thin slice; splinter
> https://en.wiktionary.org/wiki/flinder

## Setup

Copy `config.sample.json` to `~/.flindr.json` and change the contents to match
your reality.

All searches are focused on *your* Flickr account, so OAuth setup is required.

## Usage

```sh
$ npm i -g . # to install `flindr` command line tool
```

In a terminal, navigate to a directory containing photos, and run:
```sh
$ flindr ls .
```

Flindr will look up all the *names* of the photos (> 500px wide) and videos in
that folder and output URLs to the images for you to use to compare with your
local copies. If it can't find a copy, those will be noted in red.

## License

Apache 2.0
