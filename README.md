# BookMonkey

[![Build Status](https://travis-ci.org/luddwichr/book-monkey.svg?branch=master)](https://travis-ci.org/luddwichr/book-monkey)
[![codecov](https://codecov.io/gh/luddwichr/book-monkey/branch/master/graph/badge.svg)](https://codecov.io/gh/luddwichr/book-monkey)

This is a training project mostly following the instructions from the book ["**Angular**, Grundlagen, fortgeschrittene Techniken und Best Practices mit Typescript"](https://www.dpunkt.de/buecher/12400/9783864903571-angular.html).

I deviated from the book project, in that I:

- use Angular 7 instead of Angular 4
- use Yarn insted of NPM (see related [commit](https://github.com/luddwichr/book-monkey/commit/23b2ed8423cf4fa2a15c72b08fe94fdd3857b911))
- use Jest instead of Karma/Jasmine for unit testing (see related [commit](https://github.com/luddwichr/book-monkey/commit/6739f8b57af88e6b11371582b2fd4bc81a0c0e73))
- use prettier with a git-hook (via husky) for consistent formatting (see related [commit](https://github.com/luddwichr/book-monkey/commit/0cc24c30cba1369e2efbb21a6840ee4141d6e952))
- write tests as much as possible
- use ng-mocks and ts-mockery for easier testing (see [commit](https://github.com/luddwichr/book-monkey/commit/0035a3e7d63fdbe8dd0195ceb5cb01b1dc440af5) and [commit](https://github.com/luddwichr/book-monkey/commit/36405c36821289215f69b685815982964bb52fa2) for initial setup and usage)

## Branches

- [Iteration 1, showing how to use and test @Input and @Output](https://github.com/luddwichr/book-monkey/tree/iteration_1_using_input_output)
- [Iteration 2, showing how to use routing](https://github.com/luddwichr/book-monkey)
