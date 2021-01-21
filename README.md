# bili
Quick JS implementation to reduce work of [iawia002/annie](https://github.com/iawia002/annie) usage (annie is a downloader for anime website such like Bilibili)

# Before You Start
Please install [iawia002/annie](https://github.com/iawia002/annie) in your environment before you proceed. You can find the installation guide in its GitHub README.

# Installation
Simply run `npm install -g @anonymous.arthur/bili`

# Usage

## bili login
Launch a browser instance to complete auto login, you may still need to maunally finish CAPTCHA process. The captured login info will be saved into `cookie.txt`, and will be used for downloading purpose later. *_You don't have to login everytime._*

## bili d
> Tip: `bilid` is an alias of `bili d`

`bili d <bilibili_url> <destination>` is used for downloading Bilibili video where 

- `bilibili_url` is the video page that you want to download.

- `destination` is the path you want to save the video. `destination` will be set to current folder if its not supplied.



The following arguements can be provided for `bili d`
- **-f, --fidility**: Define fidility of the video, default value `120` which stands for `4K`. Available values can be found by command `annie -i <bilibili_url>`, but normally `80` is 1080p, `64` is 720p, `32` is 480p