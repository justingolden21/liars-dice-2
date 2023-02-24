# Liar's Dice

A simple game of pass the phone liar's dice

https://playliarsdice.netlify.app/

By [Justin Golden](https://justingolden.me/)

## Developing

**First Time Setup**

```bash
npm install
```

**Development**

```bash
npm run dev
```

**Build for Production**

```bash
npm run build && npm run preview
```

**Linting and Style**

This project uses ESLint and Prettier.

```bash
npm run lint
npm run format
```

**Testing**

This project uses playwright and vitest.

```bash
npm run test
npm run vitest
```

## Contributing

**Code Quality**

- Ensure code passes tests and follows style guide

Each file has a comment explaining what it does in one line, (optionally) more lines explaining in depth, and mentions where the file is used.

`/**/` syntax should be used for multi-line comments. Comments should be in sentence case and end in punctuation unless they are a phrase. Use backticks (\`) for variable, function, file, and other names related to code. Strings should be mentioned in single quotes (')

Imports: Svelte imports should be first, followed by packages, followed by local imports. Local imports should be ordered alphabetically with the exception of the `$game` store which should be at the top.

The appropriate order for files should be:

1. Top level comment
2. Imports (if any)
3. Exported properties (if any)
4. Computed values (if any)
5. Functions (if any)

Utility scripts: utility scripts should contain one function, export it as default, and have the same file name as the function they export.

Styles: If a svelte file has many styles or a lot of logic within HTML, break out the styles into a `<style>` tag and use `@apply`.

Naming: use `camelCase` for variable and function names and `PascalCase` for components.

**Git**

- Open branches and pull requests with [appropriate names](https://stackoverflow.com/a/6065944/4907950)
- Use commit messages with [appropriate names](https://www.conventionalcommits.org/)

**Code Structure**

The page itself is rendered from `src/app.html`, `src/routes/+layout.svelte`, then into `src/routes/+page.svelte`.

`+page.svelte` acts as the game controller and imports the appropriate components from `src/lib/components/`.

`$lib/` is an alias for `src/lib/`. Everything relevant is here.

- `$lib/components` contains svelte components for core game and UI logic
- `$lib/css` contains global styles
- `$lib/modals` contains modals used within the project
- `$lib/stores` contains svelte stores used within the project
- `$lib/util` contains utility functions for game logic (and local storage)

To apply typographic styles, add the appropriate class, eg. `.p` or `.h1`. h1 should be the highest level heading (1 per page), h2 should be used for only the most important, non-h1 elements, and h3 should be used for all other headings.

**Game players**

Players are handled based on their index in the list of players.

**Game bets**

The game bet starts on a face of 1, which is an invalid bet. This is a hacky way of making the game logic work.

The bet starts out on face of 1 (so it's a valid state and the player can raise but not call or spot) at the beginning of the game and beginning of the round.

This is why you'll see checks for `$game.bet.face !== 1` in the code to see if the bet is valid.
