# Articles & Comments

https://articlesandcomments.netlify.app/

## Overview

Hi there! Articles & Comments simulates a news aggregation service with articles, comments and voting features. It allows users to browse and sort articles by different criteria, read full articles, upvote, downvote and comment. Built using this API (https://github.com/nataliyazinenko/project01), React, Vite, Node.js, and deployed on Netlify.

## Features

- View all articles.
- Sort articles by comment count (high to low and low to high), votes count (high to low and low to high) and by date (new to old and old to new).
- Browse articles by topic via the topics menu.
- Vote on articles (upvote/downvote) and see real-time feedback on votes.
- Add comments to articles.
- Delete your comments.

### Homepage

At the top, there’s the "Articles & Comments" title and topics menu. Below is the list of all articles.
Each article displays the title, author, number of comments, number of votes, and how long ago it was posted. You can sort them by comment count (high to low and low to high), votes count (high to low and low to high) and by date (new to old and old to new). For example, if you prefer to see the most popular articles first, you can use the ‘sort by’ option at the top of the article list and choose "votes count, high to low" or "comments count, high to low". The articles re-arrange, now showing the most upvoted or most commented content first. By default, they are listed from new to old. Click on any article to go to its page or use the topics menu.

### Topics Menu

See the topic you like? Click on it and you will get to the page with related articles. As on the home page, you can sort them by votes, comments and date (by default, you will see most recent articles first). You can click on any article to read it, and if you click on the app title, you’ll go back to the homepage.

### Article

When you find an interesting article, you can click on it to go to its page. There you’ll find the full article with the image, title, author and time when it was posted. Underneath, are upvote and downvote buttons and the current vote count. Further down is the comments section.

### Voting

When upvoted, the vote count increases and the voting button turns green. When downvoted, the vote count decreases and the button turns red. You can only vote once, but you can change your mind!

If the upvote button is clicked again, your old vote is cancelled and the button highlight disappears. If the downvote button is clicked again, the downvote is cancelled and the button highlight disappears.

If you previously downvoted but now upvote, your old downvote is cancelled, the vote count goes up, red disappears - the button is now green. If you upvoted the article but now want to downvote it, the old upvote is cancelled, the vote count goes down, green disappears - the button is now red.

### Comments Section

Each comment shows the username of the commenter and how long ago it was posted. At the top of the comments section there’s the total number of comments and an option to add a comment.

## Getting started

The minimum version of Node required: v22.3.0  
To run the project locally, follow these steps:

1. Create a new public GitHub repository. Do not initialise it with a readme, .gitignore or license.
2. Clone the repository:

```
git clone https://github.com/nataliyazinenko/articles-and-comments.git
```

3. Navigate into the project directory:

```
cd articles-and-comments
```

4. Install dependencies:

```
​​npm install
```

5. Run the project:

```
npm run dev
```

6. From your cloned local version push your code to your new repository.

---

_This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)_
