# BookMonkey
![Build Status](https://github.com/luddwichr/book-monkey/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/luddwichr/book-monkey/branch/master/graph/badge.svg)](https://codecov.io/gh/luddwichr/book-monkey)

This is a training project mostly following the instructions from the book ["**Angular**, Grundlagen, fortgeschrittene Techniken und Best Practices mit Typescript"](https://www.dpunkt.de/buecher/12400/9783864903571-angular.html).

I deviated from the book project, in that I:

- use Angular 8 instead of Angular 4 (see this [commit](https://github.com/luddwichr/book-monkey/commit/24c1cee476f3cb39ff3fd1ca80142fcf8162a3fc) for upgrade from Angular 7 to 8)
- use Yarn instead of NPM (see related [commit](https://github.com/luddwichr/book-monkey/commit/23b2ed8423cf4fa2a15c72b08fe94fdd3857b911))
- use Jest instead of Karma/Jasmine for unit testing (see related [commit](https://github.com/luddwichr/book-monkey/commit/6739f8b57af88e6b11371582b2fd4bc81a0c0e73))
- use prettier with a git-hook (via husky) for consistent formatting (see related [commit](https://github.com/luddwichr/book-monkey/commit/0cc24c30cba1369e2efbb21a6840ee4141d6e952))
- use sonarts for additional linting, especially code duplication (see related [commit](https://github.com/luddwichr/book-monkey/commit/f0559d26940bc17b7966308588bd965edb4ce7e8))
- use ng-mocks and ts-mockito for easier testing (see [commit](https://github.com/luddwichr/book-monkey/commit/0035a3e7d63fdbe8dd0195ceb5cb01b1dc440af5) and [commit](https://github.com/luddwichr/book-monkey/commit/0979e10c93dfc1ea2a225a7efc913dbe9989e925) for initial setup and usage)
- write tests as much as possible (including services, component input/output, routing, http)

## Branches

- [Iteration 1, showing how to use and test @Input and @Output](https://github.com/luddwichr/book-monkey/tree/iteration_1_using_input_output)
- [Iteration 2-now, showing how to use routing](https://github.com/luddwichr/book-monkey) (currently master)
