# Memory Match Game

In this project, you will be creating a simple memory match game using HTML, CSS, and vanilla JavaScript. The game should display a grid of cards, each with an image on one side. When a user clicks on a card, the image should flip over to reveal the other side. The user should then click on a second card to try and match the image on the first card. If the images match, the cards should stay flipped over. If the images do not match, the cards should flip back over.

## User Story

When I visit the web page, I can see a grid of cards with the images facing down.
When I click on a card, the image flips over to reveal the other side.
I can then click on a second card to try and match the image on the first card.
If the images on the two cards match, the cards stay flipped over.
If the images on the two cards do not match, the cards flip back over.
I can continue to click on cards to try and match all the pairs.
When I match all the pairs, the game is over and I see a message that says "You win!".

## Instructions

To create this project, follow the steps below:

1. Create an HTML file named index.html and a CSS file named style.css.
2. Create a grid of cards using HTML and CSS. Each card should have an image on one side and a background color on the other side.
3. Use JavaScript to add functionality to your game. When a user clicks on a card, flip the card over to reveal the image. Keep track of which cards are currently flipped over and compare the images on the flipped cards to see if they match.
4. If the images match, keep the cards flipped over. If the images do not match, flip the cards back over.
5. Continue to allow the user to click on cards until they have matched all the pairs.
6. When all the pairs have been matched, display a message that says "You win!".

## Hints

You can use the querySelector() method in JavaScript to select elements on the page by their CSS selector. For example, document.querySelector('.card') would select all elements with a class of "card".
You can use the classList property in JavaScript to add or remove CSS classes from an HTML element. For example, document.querySelector('.card').classList.add('flipped') would add the "flipped" class to all elements with a class of "card".
You can use the setTimeout() method in JavaScript to delay an action by a specified amount of time. See w3schools - setTimeout() for more information.

## External Links

[w3schools - setTimeout()](https://www.w3schools.com/jsref/met_win_settimeout.asp)

[w3schools - CSS Grid](https://www.w3schools.com/css/css_grid.asp)

[w3schools - How to: Flip Card](https://www.w3schools.com/howto/howto_css_flip_card.asp)
