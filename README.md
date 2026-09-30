# Constelite

Save quotes from the books you read and watch them become a night sky of connected stars (ideas)!

<img width="1572" height="1015" alt="Constelite main view" src="https://github.com/user-attachments/assets/69b4b512-c2ea-4df6-8ce3-842b1bf3acdc" />

## What it does
- Save quotes from books as stars
- Notice a theme running through several of them (e.g. "Sehnsucht")
- Write an essay on that theme: the essay is what turns those stars into a named constellation
- (In progress) AI suggestions: embeddings find quotes that relate to each other, as a prompt for what to write about next

## Stack
Rails 8 API · React (Vite) · react-force-graph-2d · PostgreSQL + pgvector · Python/FastAPI (embeddings)

## Running locally

- Backend: Populate with _rails db:seeds_ and then start the server with _rails start_

- Frontend: Execute _npm run dev_

## Notes

This app is currently on its early stages and I plan on adding much more things to it, but this is just a small display for it.
